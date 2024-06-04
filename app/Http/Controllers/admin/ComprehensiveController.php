<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ComprehensiveDetailResource;
use App\Models\Comprehensive;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\Status;
use App\Models\StatusDescription;
use App\Models\Student;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ComprehensiveController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");

        $query = Comprehensive::select("id", "essay_title", "created_at", "student_id", "status_id")
            ->with([
                "student" => fn($query) => $query->select("id", "name", "nim"),
                "status" => fn($query) => $query->select("id", "name"),
            ]);
        if ($search) {
            $query->where('essay_title', "LIKE", "%$search%")
                ->orWhereHas("student", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%")
                        ->orWhere("nim", "LIKE", "%$search%");
                });
        }
        $comprehensives = $query->latest()->paginate($perpage, ["*"], 'page', $page);
        $meta = [
            "page" => $comprehensives->currentPage(),
            "perpage" => $comprehensives->perPage(),
            "total_page" => $comprehensives->lastPage(),
            "total_item" => $comprehensives->total(),
            "search" => $search,
        ];

        return Inertia::render("admin/comprehensive/Index", [
            "comprehensives" => $comprehensives,
            "meta" => $meta,
        ]);
    }

    public function show(Comprehensive $comprehensive)
    {
        return Inertia::render("admin/comprehensive/Show", [
            "comprehensive" => new ComprehensiveDetailResource($comprehensive->load(["student", "testers"])),
        ]);
    }

    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        return Inertia::render("admin/comprehensive/Create", [
            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number" => "nullable",
            "letter_date" => "nullable|date",
            "chairman_id" => "nullable|exists:lecturers,id",
            "secretary_id" => "nullable|exists:lecturers,id",

            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "required|image",
            "testers" => "nullable|array",
            "testers.*" => "nullable|string",
        ]);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("comprehensive/applicant_signs", "public");
        DB::transaction(function () use ($validated) {
            $newStudent = Student::create([
                "name" => $validated["name"],
                "nim" => $validated["nim"],
                "pob" => $validated["pob"],
                "dob" => $validated["dob"],
                "semester" => $validated["semester"],
                "phone" => $validated["phone"],
            ]);
            $newComprehensive = Comprehensive::create([
                "student_id" => $newStudent->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "status_id" => $validated["status_id"],
                "status_description_id" => $validated["status_description_id"],
                "letter_number" => $validated["letter_number"],
                "letter_date" => $validated["letter_date"],
                "chairman_id" => $validated["chairman_id"],
                "secretary_id" => $validated["secretary_id"],
            ]);
            $testerSectors = ["JARKOM", "RPL", "Agama"];
            foreach ($testerSectors as $index => $sector) {
                Tester::create([
                    "name" => $validated["testers"][$index],
                    "description" => $sector,
                    "order" => $index,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
        });
        return to_route("admin.comprehensive.index");
    }

    public function edit(Comprehensive $comprehensive)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();

        $testers = $comprehensive->testers->sortBy("order")->pluck("name");
        return Inertia::render("admin/comprehensive/Edit", [
            "comprehensive" => $comprehensive->load(["student"]),
            "testers" => $testers,
            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            // "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Comprehensive $comprehensive, Request $request)
    {
        $validated = $request->validate([
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number" => "nullable",
            "letter_date" => "nullable|date",
            "chairman_id" => "nullable|exists:lecturers,id",
            "secretary_id" => "nullable|exists:lecturers,id",

            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "nullable|image",
            "testers" => "nullable|array",
            "testers.*" => "nullable|string",
        ]);
        $updateComprehensive = [
            "essay_title" => $validated["essay_title"],
            "status_id" => $validated["status_id"],
            "status_description_id" => $validated["status_description_id"],
            "letter_number" => $validated["letter_number"],
            "letter_date" => $validated["letter_date"],
            "chairman_id" => $validated["chairman_id"],
            "secretary_id" => $validated["secretary_id"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($comprehensive->applicant_sign)) {
                Storage::delete($comprehensive->applicant_sign);
            }
            $updateComprehensive["applicant_sign"] = $request->file("applicant_sign")->storePublicly("comprehensive/applicant_signs", "public");
        }

        DB::transaction(function () use ($comprehensive, $validated, $updateComprehensive) {
            $comprehensive->student->update([
                "name" => $validated["name"],
                "nim" => $validated["nim"],
                "pob" => $validated["pob"],
                "dob" => $validated["dob"],
                "semester" => $validated["semester"],
                "phone" => $validated["phone"],
            ]);
            $comprehensive->update($updateComprehensive);
            $testerSectors = ["JARKOM", "RPL", "Agama"];
            foreach ($comprehensive->testers as $index => $tester) {
                if ($tester->description == $testerSectors[$index]) {
                    $tester->update([
                        "name" => $validated["testers"][$index],
                    ]);
                }
            }
        });
        return to_route("admin.comprehensive.index");
    }

    public function destroy(Comprehensive $comprehensive)
    {
        DB::transaction(function () use ($comprehensive) {
            $comprehensive->testers()->delete();
            if (Storage::exists($comprehensive->applicant_sign)) {
                Storage::delete($comprehensive->applicant_sign);
            }
            $comprehensive->delete();
            $comprehensive->student()->delete();
        });
        return to_route("admin.comprehensive.index");
    }
}
