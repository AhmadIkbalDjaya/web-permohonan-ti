<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Http\Requests\public\ProposalStoreRequest;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\Mentor;
use App\Models\Proposal;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\File;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "proposal")->get();
        return Inertia::render("public/proposal/Index", [
            "file_requirements" => $file_requirements,
            "lecturers" => $lecturers,
        ]);
    }

    public function store(ProposalStoreRequest $request)
    {
        $file_requirements = FileRequirement::select("name", "slug", "is_required")->where("request_type", "proposal")->get();
        $validated = $request->validated();
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("proposal/applicant_signs", "public");
        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("proposal/files", "public");
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
            $newProposal = Proposal::create([
                "student_id" => $newStudent->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "schedule_id" => $newSchedule->id,
            ]);
            foreach ($file_requirements as $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->slug],
                    "name" => $file_requirement->name,
                    "proposal_id" => $newProposal->id,
                ]);
            }
            foreach ($validated["mentor_ids"] as $index => $mentor) {
                Mentor::create([
                    "lecturer_id" => $mentor,
                    "order" => $index,
                    "proposal_id" => $newProposal->id,
                ]);
            }
            for ($i = 0; $i < 2; $i++) {
                Tester::create([
                    "order" => $i,
                    "proposal_id" => $newProposal->id,
                ]);
            }
        });
        return to_route("home");
    }
}
