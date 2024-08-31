<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateSearchRequest;
use App\Http\Resources\Admin\ComprehensiveDetailResource;
use App\Http\Resources\MetaPaginateSearch;
use App\Models\Comprehensive;
use App\Models\File;
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
    public function index(PaginateSearchRequest $request)
    {
        $validated = $request->validated();
        $perpage = $validated["perpage"] ?? 10;
        $search = $validated["search"] ?? "";

        $comprehensives = Comprehensive::select("id", "essay_title", "created_at", "student_id", "status_id")
            ->with([
                "student" => fn($query) => $query->select("id", "name", "nim"),
                "status" => fn($query) => $query->select("id", "name"),
            ])->when($search, function ($query, $search) {
                $query->where('essay_title', "LIKE", "%$search%")
                    ->orWhereHas("student", function ($query) use ($search) {
                        $query->where("name", "LIKE", "%$search%")
                            ->orWhere("nim", "LIKE", "%$search%");
                    });
            })->latest()->paginate($perpage);
        $comprehensives_ids = Comprehensive::pluck("id");
        return Inertia::render("admin/comprehensive/Index", [
            "comprehensives" => $comprehensives,
            "meta" => new MetaPaginateSearch($comprehensives, $search),
            "comprehensive_ids" => $comprehensives_ids,
        ]);
    }

    public function show(Comprehensive $comprehensive)
    {
        $file_requirements = FileRequirement::where("request_type", "comprehensive")->get();
        return Inertia::render("admin/comprehensive/Show", [
            "comprehensive" => new ComprehensiveDetailResource($comprehensive->load(["student", "testers"])),
            "file_requirements" => $file_requirements,
        ]);
    }

    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "comprehensive")->get();
        return Inertia::render("admin/comprehensive/Create", [
            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
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
            "tester_ids" => "nullable|array",
            "tester_ids.*" => "nullable|string|exists:lecturers,id",
        ];
        $file_requirements = FileRequirement::where("request_type", "comprehensive")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("comprehensive/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("comprehensive/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($validated, $file_requirements) {
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
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->slug],
                    "name" => $file_requirement->name,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
            $testerSectors = ["JARKOM", "RPL", "Agama"];
            foreach ($testerSectors as $index => $sector) {
                Tester::create([
                    "lecturer_id" => $validated["tester_ids"][$index],
                    "description" => $sector,
                    "order" => $index,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
        });
        return to_route("admin.comprehensive.index")->with("success", "Data berhasil ditambahkan");
    }

    public function edit(Comprehensive $comprehensive)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();

        $file_requirements = FileRequirement::where("request_type", "comprehensive")->get();
        return Inertia::render("admin/comprehensive/Edit", [
            "comprehensive" => new ComprehensiveDetailResource($comprehensive),

            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Comprehensive $comprehensive, Request $request)
    {
        $rules = [
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
            "tester_ids" => "nullable|array",
            "tester_ids.*" => "nullable|string|exists:lecturers,id",
        ];
        $file_requirements = FileRequirement::where("request_type", "comprehensive")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = "nullable|mimes:pdf";
        }

        $validated = $request->validate($rules);

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

        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                foreach ($comprehensive->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("comprehensive/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($comprehensive, $validated, $updateComprehensive, $file_requirements) {
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
                        "lecturer_id" => $validated["tester_ids"][$index],
                    ]);
                }
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                if (array_key_exists($file_requirement->slug, $validated)) {
                    foreach ($comprehensive->files as $index => $file) {
                        if ($file->name == $file_requirement->name) {
                            $file->update([
                                "file" => $validated[$file_requirement->slug],
                            ]);
                        }
                        // wrong place
                        // else {
                        //     File::create([
                        //         "file" => $validated[$file_requirement->name],
                        //         "name" => $file_requirement->name,
                        //         "proposal_id" => $proposal->id,
                        //     ]);
                        // }
                    }
                }
            }
        });
        return to_route("admin.comprehensive.show", ["comprehensive" => $comprehensive->id])->with("warning", "Data berhasil di ubah");
    }

    public function destroy(Comprehensive $comprehensive)
    {
        DB::transaction(function () use ($comprehensive) {
            $this->deleteComprehensive($comprehensive);
        });
        return to_route("admin.comprehensive.index")->with("error", "Data berhasil dihapus");
    }

    public function destroys(Request $request)
    {
        $validated = $request->validate([
            "ids" => "required|array|min:1",
            "ids*" => "required|exists:comprehensives,id",
        ]);
        DB::transaction(function () use ($validated) {
            foreach ($validated["ids"] as $id) {
                $result = Comprehensive::find($id);
                $this->deleteComprehensive($result);
            }
        });
        return to_route("admin.comprehensive.index")->with("error", "Data berhasil dihapus");
    }

    public function deleteComprehensive(Comprehensive $comprehensive)
    {
        $comprehensive->testers()->delete();
        foreach ($comprehensive->files as $index => $file) {
            if (Storage::exists($file->file)) {
                Storage::delete($file->file);
            }
        }
        if (Storage::exists($comprehensive->applicant_sign)) {
            Storage::delete($comprehensive->applicant_sign);
        }
        $comprehensive->files()->delete();
        $comprehensive->delete();
        $comprehensive->student()->delete();
    }
}
