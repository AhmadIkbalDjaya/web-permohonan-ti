<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Comprehensive;
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

        $query = Comprehensive::select("id", "essay_title", "created_at", "student_id")
            ->with(["student" => fn($query) => $query->select("id", "name", "nim")]);
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

    public function create()
    {
        return Inertia::render("admin/comprehensive/Create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
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
        $testers = $comprehensive->testers->sortBy("order")->pluck("name");
        return Inertia::render("admin/comprehensive/Edit", [
            "comprehensive" => $comprehensive->load(["student"]),
            "testers" => $testers,
        ]);
    }

    public function update(Comprehensive $comprehensive, Request $request)
    {
        $validated = $request->validate([
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
            $comprehensive->student()->delete();
            $comprehensive->testers()->delete();
            if (Storage::exists($comprehensive->applicant_sign)) {
                Storage::delete($comprehensive->applicant_sign);
            }
            $comprehensive->delete();
        });
        return to_route("admin.comprehensive.index");
    }
}
