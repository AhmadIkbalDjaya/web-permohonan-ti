<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\PPL;
use App\Models\PplStudent;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PplController extends Controller
{
    public function index()
    {
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        return Inertia::render("public/ppl/Index", [
            "file_requirements" => $file_requirements,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "student_count" => "required|numeric|min:1",

            "names" => "required|array|size:" . $request->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|size:" . $request->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|size:" . $request->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|size:" . $request->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|size:" . $request->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|size:" . $request->student_count,
            "phones.*" => "required|phone:ID",
        ];
        $file_requirements = FileRequirement::where("request_type", "ppl")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->slug] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("ppl/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
        DB::transaction(function () use ($validated, $file_requirements) {
            $newPPL = PPL::create([
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
                    "ppl_id" => $newPPL->id,
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
                    "student_id" => $newStudent->id,
                    "ppl_id" => $newPPL->id,
                ]);
            }
        });
        return to_route("home");
    }
}
