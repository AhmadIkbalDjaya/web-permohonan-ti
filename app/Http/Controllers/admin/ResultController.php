<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use App\Models\Mentor;
use App\Models\Result;
use App\Models\Schedule;
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

        $query = Result::select("id", "essay_title", "created_at", "student_id")
            ->with(["student" => fn($query) => $query->select("id", "name", "nim")]);
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

    public function create()
    {
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        return Inertia::render("admin/result/Create", [
            "file_requirements" => $file_requirements,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "required|image",
            "mentors" => "array|min:2",
            "mentors.*" => "required|string",
            "testers" => "nullable|array",
            "testers.*" => "nullable|string",
            "date" => "nullable|date",
            "time" => "nullable|date_format:H:i",
            "location" => "nullable|string",
        ];

        $file_requirements = FileRequirement::where("request_type", "results")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->name)) {
                $validated[$file_requirement->name] = $request->file($file_requirement->name)->storePublicly("result/file", "public");
            } else {
                // $validated[$file_requirement->name] = null;
                unset($validated[$file_requirement->name]);
            }
        }
        DB::transaction(function () use ($validated, $file_requirements) {
            $student = Student::create([
                "name" => $validated["name"],
                "nim" => $validated["nim"],
                "pob" => $validated["pob"],
                "dob" => $validated["dob"],
                "semester" => $validated["semester"],
                "phone" => $validated["phone"],
            ]);
            $schedule = Schedule::create([
                "date" => $validated["date"],
                "time" => $validated["time"],
                "location" => $validated["location"],
            ]);
            $result = Result::create([
                "student_id" => $student->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "schedule_id" => $schedule->id,
            ]);
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->name],
                    "name" => $file_requirement->name,
                    "result_id" => $result->id,
                ]);
            }
            foreach ($validated["mentors"] as $index => $mentor) {
                Mentor::create([
                    "name" => $mentor,
                    "order" => $index,
                    "result_id" => $result->id,
                ]);
            }
            foreach ($validated["testers"] as $index => $tester) {
                Tester::create([
                    "name" => $tester,
                    "order" => $index,
                    "result_id" => $result->id,
                ]);
            }
        });
        return to_route("admin.result.index");
    }

    public function edit(Result $result, Request $request)
    {
        $mentors = $result->mentors->sortBy('order')->pluck('name');
        $testers = $result->testers->sortBy('order')->pluck('name');
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        return Inertia::render("admin/result/Edit", [
            "result" => $result->load(["student", "schedule"]),
            "mentors" => $mentors,
            "testers" => $testers,
            "files" => $result->files,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Result $result, Request $request)
    {
        $rules = [
            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|phone:ID",
            "essay_title" => "required",
            "applicant_sign" => "nullable|image",
            "mentors" => "array|min:2",
            "mentors.*" => "required|string",
            "testers" => "nullable|array",
            "testers.*" => "nullable|string",
            "date" => "nullable|date",
            "time" => "nullable|date_format:H:i",
            "location" => "nullable|string",
        ];
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = "nullable|mimes:pdf";
        }

        $validated = $request->validate($rules);

        $updateResult = [
            "essay_title" => $validated["essay_title"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($result->applicant_sign)) {
                Storage::delete($result->applicant_sign);
            }
            $updateResult["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        }

        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->name)) {
                foreach ($result->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->name] = $request->file($file_requirement->name)->storePublicly("result/file", "public");
            } else {
                unset($validated[$file_requirement->name]);
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
                "time" => $validated["time"],
                "location" => $validated["location"],
            ]);
            foreach ($result->mentors as $index => $mentor) {
                $mentor->update([
                    "name" => $validated["mentors"][$index],
                ]);
            }
            foreach ($result->testers as $index => $mentor) {
                $mentor->update([
                    "name" => $validated["testers"][$index],
                ]);
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                if (array_key_exists($file_requirement->name, $validated)) {
                    foreach ($result->files as $index => $file) {
                        if ($file->name == $file_requirement->name) {
                            $file->update([
                                "file" => $validated[$file_requirement->name],
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
        return to_route("admin.result.index");
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
        return to_route("admin.result.index");
    }
}
