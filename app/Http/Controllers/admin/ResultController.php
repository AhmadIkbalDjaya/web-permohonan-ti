<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ResultDetailResource;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\Mentor;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Status;
use App\Models\StatusDescription;
use App\Models\Student;
use App\Models\File;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");

        $query = Result::select("id", "essay_title", "created_at", "student_id", "status_id")
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
        $results = $query->latest()->paginate($perpage, ["*"], 'page', $page);
        $meta = [
            "page" => $results->currentPage(),
            "perpage" => $results->perPage(),
            "total_page" => $results->lastPage(),
            "total_item" => $results->total(),
            "search" => $search,
        ];
        return Inertia::render("admin/result/Index", [
            "results" => $results,
            "meta" => $meta,
        ]);
    }

    public function show(Result $result)
    {
        $file_requirements = FileRequirement::where("request_type", "result")->get();
        return Inertia::render("admin/result/Show", [
            "result" => new ResultDetailResource($result->load(["student", "schedule", "mentors", "testers", "files"])),
            "file_requirements" => $file_requirements,
        ]);
    }

    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "result")->get();
        return Inertia::render("admin/result/Create", [
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
            "executor_id" => "nullable|exists:lecturers,id",

            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "required|image",
            "mentor_ids" => "array|min:2",
            "mentor_ids.*" => "required|string|exists:lecturers,id",
            "tester_ids" => "nullable|array",
            "tester_ids.*" => "nullable|string|exists:lecturers,id",
            "date" => "nullable|date",
            "time_zone" => "required|in:wib,wita,wit",
            "start_time" => "nullable|date_format:H:i",
            "end_time" => "nullable|date_format:H:i",
            "location" => "nullable|string",
        ];

        $file_requirements = FileRequirement::where("request_type", "result")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("result/files", "public");
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
            $newSchedule = Schedule::create([
                "date" => $validated["date"],
                "time_zone" => $validated["time_zone"],
                "start_time" => $validated["start_time"],
                "end_time" => $validated["end_time"],
                "location" => $validated["location"],
            ]);
            $newResult = Result::create([
                "student_id" => $newStudent->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "schedule_id" => $newSchedule->id,

                "status_id" => $validated["status_id"],
                "status_description_id" => $validated["status_description_id"],
                "letter_number" => $validated["letter_number"],
                "letter_date" => $validated["letter_date"],
                "chairman_id" => $validated["chairman_id"],
                "secretary_id" => $validated["secretary_id"],
                "executor_id" => $validated["executor_id"],
            ]);
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->slug],
                    "name" => $file_requirement->name,
                    "result_id" => $newResult->id,
                ]);
            }
            foreach ($validated["mentor_ids"] as $index => $mentor) {
                Mentor::create([
                    "lecturer_id" => $mentor,
                    "order" => $index,
                    "result_id" => $newResult->id,
                ]);
            }
            foreach ($validated["tester_ids"] as $index => $tester) {
                Tester::create([
                    "lecturer_id" => $tester,
                    "order" => $index,
                    "result_id" => $newResult->id,
                ]);
            }
        });
        return to_route("admin.result.index")->with("success", "Data berhasil ditambahkan");
    }

    public function edit(Result $result, Request $request)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();

        $file_requirements = FileRequirement::where("request_type", "result")->get();
        return Inertia::render("admin/result/Edit", [
            "result" => new ResultDetailResource($result),

            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Result $result, Request $request)
    {
        $rules = [
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number" => "nullable",
            "letter_date" => "nullable|date",
            "chairman_id" => "nullable|exists:lecturers,id",
            "secretary_id" => "nullable|exists:lecturers,id",
            "executor_id" => "nullable|exists:lecturers,id",

            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "nullable|image",
            "mentor_ids" => "array|min:2",
            "mentor_ids.*" => "required|string|exists:lecturers,id",
            "tester_ids" => "nullable|array",
            "tester_ids.*" => "nullable|string|exists:lecturers,id",
            "date" => "nullable|date",
            "time_zone" => "required|in:wib,wita,wit",
            "start_time" => "nullable|date_format:H:i",
            "end_time" => "nullable|date_format:H:i",
            "location" => "nullable|string",
        ];
        $file_requirements = FileRequirement::where("request_type", "result")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = "nullable|mimes:pdf";
        }

        $validated = $request->validate($rules);

        $updateResult = [
            "essay_title" => $validated["essay_title"],
            "status_id" => $validated["status_id"],
            "status_description_id" => $validated["status_description_id"],
            "letter_number" => $validated["letter_number"],
            "letter_date" => $validated["letter_date"],
            "chairman_id" => $validated["chairman_id"],
            "secretary_id" => $validated["secretary_id"],
            "executor_id" => $validated["executor_id"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($result->applicant_sign)) {
                Storage::delete($result->applicant_sign);
            }
            $updateResult["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        }

        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                foreach ($result->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("result/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($result, $updateResult, $validated, $file_requirements) {
            $result->update($updateResult);
            $result->student->update([
                "name" => $validated["name"],
                "nim" => $validated["nim"],
                "pob" => $validated["pob"],
                "dob" => $validated["dob"],
                "semester" => $validated["semester"],
                "phone" => $validated["phone"],
            ]);
            $result->schedule->update([
                "date" => $validated["date"],
                "time_zone" => $validated["time_zone"],
                "start_time" => $validated["start_time"],
                "end_time" => $validated["end_time"],
                "location" => $validated["location"],
            ]);
            foreach ($result->mentors as $index => $mentor) {
                $mentor->update([
                    "lecturer_id" => $validated["mentor_ids"][$index],
                ]);
            }
            foreach ($result->testers as $index => $mentor) {
                $mentor->update([
                    "lecturer_id" => $validated["tester_ids"][$index],
                ]);
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                if (array_key_exists($file_requirement->slug, $validated)) {
                    foreach ($result->files as $index => $file) {
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
                        //         "result_id" => $result->id,
                        //     ]);
                        // }
                    }
                }
            }
        });
        return to_route("admin.result.show", ["result" => $result->id])->with("warning", "Data berhasil di ubah");
    }

    public function destroy(Result $result)
    {
        DB::transaction(function () use ($result) {
            $result->mentors()->delete();
            $result->testers()->delete();
            foreach ($result->files as $index => $file) {
                if (Storage::exists($file->file)) {
                    Storage::delete($file->file);
                }
            }
            if (Storage::exists($result->applicant_sign)) {
                Storage::delete($result->applicant_sign);
            }
            $result->files()->delete();
            $result->delete();
            $result->student()->delete();
            $result->schedule()->delete();
        });
        return to_route("admin.result.index")->with("success", "Data berhasil dihapus");
    }
}
