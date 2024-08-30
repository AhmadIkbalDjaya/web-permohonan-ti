<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateSearchRequest;
use App\Http\Resources\Admin\PPLDetailResource;
use App\Http\Resources\MetaPaginateSearch;
use App\Models\File;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\PPL;
use App\Models\PplStudent;
use App\Models\Status;
use App\Models\StatusDescription;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PplController extends Controller
{
    public function index(PaginateSearchRequest $request)
    {
        $validated = $request->validated();
        $perpage = $validated["perpage"] ?? 10;
        $search = $validated["search"] ?? "";

        $ppls = PPL::select("id", "location", "created_at", "status_id")
            ->with([
                "students" => fn($query) => $query->select("students.id", "students.name", "students.nim"),
                "status" => fn($query) => $query->select("id", "name"),
            ])->when($search, function ($query, $search) {
                $query->where('location', "LIKE", "%$search%")
                    ->orWhereHas("students", function ($query) use ($search) {
                        $query->where("name", "LIKE", "%$search%")
                            ->orWhere("nim", "LIKE", "%$search%");
                    });
            })->latest()->paginate($perpage);
        return Inertia::render("admin/ppl/Index", [
            "ppls" => $ppls,
            "meta" => new MetaPaginateSearch($ppls),
        ]);
    }

    public function show(PPL $ppl)
    {
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        return Inertia::render("admin/ppl/Show", [
            "ppl" => new PPLDetailResource($ppl),
            "file_requirements" => $file_requirements,
        ]);
    }

    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        return Inertia::render("admin/ppl/Create", [
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
            "letter_number_mentor" => "nullable",
            "letter_number_introduction" => "nullable",
            "letter_date" => "nullable|date",
            "addressed_to" => "nullable|string",
            "mentor_id" => "nullable|exists:lecturers,id",

            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "student_count" => "required|numeric|min:1",

            "names" => "required|array|min:" . $request->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|min:" . $request->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|min:" . $request->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|min:" . $request->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|min:" . $request->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|min:" . $request->student_count,
            "phones.*" => "required|phone:ID",
        ];
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("ppl/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($validated, $file_requirements) {
            $newPpl = PPL::create([
                "status_id" => $validated["status_id"],
                "status_description_id" => $validated["status_description_id"],
                "letter_number_mentor" => $validated["letter_number_mentor"],
                "letter_number_introduction" => $validated["letter_number_introduction"],
                "letter_date" => $validated["letter_date"],
                "addressed_to" => $validated["addressed_to"],
                "mentor_id" => $validated["mentor_id"],

                "start_date" => $validated["start_date"],
                "end_date" => $validated["end_date"],
                "location" => $validated["location"],
                "location_address" => $validated["location_address"],
                "applicant_sign" => $validated["applicant_sign"],
            ]);
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->slug],
                    "name" => $file_requirement->name,
                    "ppl_id" => $newPpl->id,
                ]);
            }
            for ($i = 0; $i < $validated["student_count"]; $i++) {
                $newStudent = Student::create([
                    "name" => $validated["names"][$i],
                    "nim" => $validated["nims"][$i],
                    "pob" => $validated["pobs"][$i],
                    "dob" => $validated["dobs"][$i],
                    "semester" => $validated["semesters"][$i],
                    "phone" => $validated["phones"][$i],
                ]);
                PplStudent::create([
                    "ppl_id" => $newPpl->id,
                    "student_id" => $newStudent->id,
                ]);
            }
        });
        return to_route("admin.ppl.index")->with("success", "Data berhasil ditambahkan");
    }

    public function edit(PPL $ppl)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        // dd($ppl->files);
        return Inertia::render("admin/ppl/Edit", [
            "ppl" => new PPLDetailResource($ppl),

            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(PPL $ppl, Request $request)
    {
        $rules = [
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number_mentor" => "nullable",
            "letter_number_introduction" => "nullable",
            "letter_date" => "nullable|date",
            "addressed_to" => "nullable|string",
            "mentor_id" => "nullable|exists:lecturers,id",

            "start_date" => "required",
            "end_date" => "required",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "nullable|image",
            "student_count" => "numeric|min:1",

            "names" => "required|array|min:" . $request->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|min:" . $request->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|min:" . $request->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|min:" . $request->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|min:" . $request->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|min:" . $request->student_count,
            "phones.*" => "required|phone:ID",
        ];
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = "nullable|mimes:pdf";
        }
        $validated = $request->validate($rules);

        $updatePpl = [
            "status_id" => $validated["status_id"],
            "status_description_id" => $validated["status_description_id"],
            "letter_number_mentor" => $validated["letter_number_mentor"],
            "letter_number_introduction" => $validated["letter_number_introduction"],
            "letter_date" => $validated["letter_date"],
            "addressed_to" => $validated["addressed_to"],
            "mentor_id" => $validated["mentor_id"],

            "start_date" => $validated["start_date"],
            "end_date" => $validated["end_date"],
            "location" => $validated["location"],
            "location_address" => $validated["location_address"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($ppl->applicant_sign)) {
                Storage::delete($ppl->applicant_sign);
            }
            $updatePpl["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl/applicant_signs", "public");
        }
        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                foreach ($ppl->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("proposal/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($ppl, $updatePpl, $validated, $file_requirements) {
            $ppl->update($updatePpl);
            $ppl->students()->delete();
            for ($i = 0; $i < $validated["student_count"]; $i++) {
                $newStudent = Student::create([
                    "name" => $validated["names"][$i],
                    "nim" => $validated["nims"][$i],
                    "pob" => $validated["pobs"][$i],
                    "dob" => $validated["dobs"][$i],
                    "semester" => $validated["semesters"][$i],
                    "phone" => $validated["phones"][$i],
                ]);
                PplStudent::create([
                    "ppl_id" => $ppl->id,
                    "student_id" => $newStudent->id,
                ]);
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                if (array_key_exists($file_requirement->slug, $validated)) {
                    foreach ($ppl->files as $index => $file) {
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
        return to_route("admin.ppl.show", ["ppl" => $ppl->id])->with("warning", "Data berhasil di ubah");
    }
    public function destroy(PPL $ppl)
    {
        DB::transaction(function () use ($ppl) {
            $ppl->mentor()->delete();
            $ppl->students()->delete();
            foreach ($ppl->files as $index => $file) {
                if (Storage::exists($file->file)) {
                    Storage::delete($file->file);
                }
            }
            if (Storage::exists($ppl->applicant_sign)) {
                Storage::delete($ppl->applicant_sign);
            }
            $ppl->files()->delete();
            $ppl->delete();
        });
        return to_route("admin.ppl.index")->with("error", "Data berhasil dihapus");
    }
}
