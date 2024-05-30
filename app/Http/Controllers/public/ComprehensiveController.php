<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Models\Comprehensive;
use App\Models\FileRequirement;
use App\Models\Student;
use App\Models\File;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ComprehensiveController extends Controller
{
    public function index()
    {
        $file_requirements = FileRequirement::where("request_type", "comprehensives")->get();
        return Inertia::render("public/comprehensive/Index", [
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
        ];
        $file_requirements = FileRequirement::where("request_type", "comprehensives")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->name)) {
                $validated[$file_requirement->name] = $request->file($file_requirement)->storePublicly("result/files", "public");
            } else {
                unset($validated[$file_requirement->name]);
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
            ]);
            $testerSectors = ["JARKOM", "RPL", "Agama"];
            foreach ($testerSectors as $index => $sector) {
                Tester::create([
                    "name" => $validated["testers"][$index] || null,
                    "description" => $sector,
                    "order" => $index,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->name],
                    "name" => $file_requirement->name,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
        });
        return to_route("home");
    }
}
