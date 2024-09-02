<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Http\Requests\public\ComprehensiveStoreRequest;
use App\Models\Comprehensive;
use App\Models\FileRequirement;
use App\Models\Lecturer;
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
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "comprehensive")->get();
        return Inertia::render("public/comprehensive/Index", [
            "file_requirements" => $file_requirements,
            "lecturers" => $lecturers,
        ]);
    }

    public function store(ComprehensiveStoreRequest $request)
    {
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "comprehensive")->get();
        $validated = $request->validated();
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $file_requirement) {
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
            ]);
            foreach ($file_requirements as $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->slug],
                    "name" => $file_requirement->name,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
            $testerSectors = ["JARKOM", "RPL", "Agama"];
            foreach ($testerSectors as $index => $sector) {
                Tester::create([
                    "description" => $sector,
                    "order" => $index,
                    "comprehensive_id" => $newComprehensive->id,
                ]);
            }
            foreach ($file_requirements as $file_requirement) {
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
