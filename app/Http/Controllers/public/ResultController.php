<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Http\Requests\public\ResultStoreRequest;
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
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "result")->get();
        return Inertia::render("public/result/Index", [
            "file_requirements" => $file_requirements,
            "lecturers" => $lecturers,
        ]);
    }

    public function store(ResultStoreRequest $request)
    {
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "result")->get();
        $validated = $request->validated();
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("result/applicant_signs", "public");
        foreach ($file_requirements as $file_requirement) {
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
            foreach ($file_requirements as $file_requirement) {
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
