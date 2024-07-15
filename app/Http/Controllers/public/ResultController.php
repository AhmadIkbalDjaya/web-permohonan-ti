<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\Mentor;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\File;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "result")->get();
        return Inertia::render("public/result/Index", [
            "file_requirements" => $file_requirements,
            "lecturers" => $lecturers,
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
            "mentor_ids" => "array|min:2",
            "mentor_ids.*" => "required|string|exists:lecturers,id",
            "tester_ids" => "required|min:2",
            "tester_ids.*" => "required|string|exists:lecturers,id",
        ];
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
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
            $newSchedule = Schedule::create();
            $newResult = Result::create([
                "student_id" => $newStudent->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "schedule_id" => $newSchedule->id,
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
        return to_route("home");
    }
}
