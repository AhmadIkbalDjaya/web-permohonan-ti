<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use App\Models\Mentor;
use App\Models\File;
use App\Models\Proposal;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");

        $query = Proposal::select("id", "essay_title", "created_at", "student_id")
            ->with(["student" => fn($query) => $query->select("id", "name", "nim")]);
        if ($search) {
            $query->where('essay_title', "LIKE", "%$search%")
                ->orWhereHas("student", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%")
                        ->orWhere("nim", "LIKE", "%$search%");
                });
        }
        $proposals = $query->latest()->paginate($perpage, ["*"], 'page', $page);
        $meta = [
            "page" => $proposals->currentPage(),
            "perpage" => $proposals->perPage(),
            "total_page" => $proposals->lastPage(),
            "total_item" => $proposals->total(),
            "search" => $search,
        ];
        return Inertia::render("admin/proposal/Index", [
            "proposals" => $proposals,
            "meta" => $meta,
        ]);
    }
    public function create()
    {
        $file_requirements = FileRequirement::where("request_type", "proposals")->get();
        return Inertia::render("admin/proposal/Create", [
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
        $file_requirements = FileRequirement::where("request_type", "proposals")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = ($file_requirement->is_required ? "required" : "nullable") . "|mimes:pdf";
        }
        $validated = $request->validate($rules);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("proposal/applicant_signs", "public");
        foreach ($file_requirements as $index => $file_requirement) {
            if ($request->file($file_requirement->name)) {
                $validated[$file_requirement->name] = $request->file($file_requirement->name)->storePublicly("proposal/file", "public");
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
            $proposal = Proposal::create([
                "student_id" => $student->id,
                "essay_title" => $validated["essay_title"],
                "applicant_sign" => $validated["applicant_sign"],
                "schedule_id" => $schedule->id,
            ]);
            foreach ($file_requirements as $index => $file_requirement) {
                File::create([
                    "file" => $validated[$file_requirement->name],
                    "name" => $file_requirement->name,
                    "proposal_id" => $proposal->id,
                ]);
            }
            foreach ($validated["mentors"] as $index => $mentor) {
                Mentor::create([
                    "name" => $mentor,
                    "order" => $index,
                    "proposal_id" => $proposal->id,
                ]);
            }
            foreach ($validated["testers"] as $index => $tester) {
                Tester::create([
                    "name" => $tester,
                    "order" => $index,
                    "proposal_id" => $proposal->id,
                ]);
            }
        });
        return to_route("admin.proposal.index");
    }

    public function edit(Proposal $proposal)
    {
        // dd($proposal->mentors);
        $mentors = $proposal->mentors->sortBy('order')->pluck('name');
        $testers = $proposal->testers->sortBy('order')->pluck('name');
        $file_requirements = FileRequirement::where("request_type", "proposals")->get();
        return Inertia::render("admin/proposal/Edit", [
            "proposal" => $proposal->load(["student", "schedule"]),
            "mentors" => $mentors,
            "testers" => $testers,
            "files" => $proposal->files,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Proposal $proposal, Request $request)
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
        $file_requirements = FileRequirement::where("request_type", "proposals")->get();
        foreach ($file_requirements as $file_requirement) {
            $rules[$file_requirement->name] = "nullable|mimes:pdf";
        }

        $validated = $request->validate($rules);

        $updateProposal = [
            "essay_title" => $validated["essay_title"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($proposal->applicant_sign)) {
                Storage::delete($proposal->applicant_sign);
            }
            $updateProposal["applicant_sign"] = $request->file("applicant_sign")->storePublicly("proposal/applicant_signs", "public");
        }

        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->name)) {
                // $proposal->files->
                foreach ($proposal->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->name] = $request->file($file_requirement->name)->storePublicly("proposal/file", "public");
            } else {
                unset($validated[$file_requirement->name]);
            }
        }
        // dd($validated);
        DB::transaction(function () use ($proposal, $updateProposal, $validated, $file_requirements) {
            $proposal->update($updateProposal);
            $proposal->student->update([
                "name" => $validated["name"],
                "nim" => $validated["nim"],
                "pob" => $validated["pob"],
                "dob" => $validated["dob"],
                "semester" => $validated["semester"],
                "phone" => $validated["phone"],
            ]);
            $proposal->schedule->update([
                "date" => $validated["date"],
                "time" => $validated["time"],
                "location" => $validated["location"],
            ]);
            foreach ($proposal->mentors as $index => $mentor) {
                $mentor->update([
                    "name" => $validated["mentors"][$index],
                ]);
            }
            foreach ($proposal->testers as $index => $mentor) {
                $mentor->update([
                    "name" => $validated["testers"][$index],
                ]);
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                // if ($validated[$file_requirement->name]) {
                if (array_key_exists($file_requirement->name, $validated)) {
                    foreach ($proposal->files as $index => $file) {
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
                        //         "proposal_id" => $proposal->id,
                        //     ]);
                        // }
                    }
                }
            }
        });
        return to_route("admin.proposal.index");
    }

    public function destroy(Proposal $proposal)
    {
        DB::transaction(function () use ($proposal) {
            $proposal->student->delete();
            $proposal->schedule > delete();
            if (Storage::exists($proposal->applicant_sign)) {
                Storage::delete($proposal->applicant_sign);
            }
            $proposal->mentors->delete();
            $proposal->testers->delete();
            foreach ($proposal->files as $index => $file) {
                if (Storage::exists($file->file)) {
                    Storage::delete($file->file);
                }
            }
            $proposal->files->delete();
            $proposal->delete();
        });
        return to_route("admin.proposal.index");
    }
}
