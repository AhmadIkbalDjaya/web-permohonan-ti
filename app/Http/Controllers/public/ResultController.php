<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use App\Models\Mentor;
use App\Models\Result;
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
        return Inertia::render("public/result/Index");
    }

    public function store(Request $request)
    {
        $rules = [
            "name" => "required",
            "nim" => "required|numeric",
            "pob" => "required",
            "dob" => "required|date",
            "semester" => "required|integer|min:0",
            "phone" => "required|regex:^(\+62|62|0)8[1-9][0-9]{6,9}$",
            "essay_title" => "required",
            "applicant_sign" => "required",
            "mentors" => "array|min:2",
            "mentors.*" => "required|string",
            "testers" => "array|min:2",
            "testers.*" => "required|string",
        ];
        $file_requirements = FileRequirement::where("request_type", "results")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->name)) {
                $validated[$file_requirement->name] = $request->file($file_requirement)->storePublicly("result/files", "public");
            } else {
                $validated[$file_requirement->name] = "null";
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
            $result = Result::create([
                "student_id" => $student->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
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
        return redirect()->route('home');
    }
}
