<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\proposal\ProposalStoreRequest;
use App\Http\Requests\admin\proposal\ProposalUpdateRequest;
use App\Http\Requests\PaginateSearchRequest;
use App\Http\Resources\Admin\ProposalDetailResource;
use App\Http\Resources\MetaPaginateSearch;
use App\Models\FileRequirement;
use App\Models\Lecturer;
use App\Models\Mentor;
use App\Models\File;
use App\Models\Proposal;
use App\Models\Schedule;
use App\Models\Status;
use App\Models\StatusDescription;
use App\Models\Student;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index(PaginateSearchRequest $request)
    {
        $validated = $request->validated();
        $perpage = $validated["perpage"] ?? 10;
        $search = $validated["search"] ?? "";

        $proposals = Proposal::select("id", "essay_title", "created_at", "student_id", "status_id")
            ->with([
                "student" => fn($query) => $query->select("id", "name", "nim"),
                "status" => fn($query) => $query->select("id", "name")
            ])
            ->when(
                $search,
                function ($query, $search) {
                    $query->where('essay_title', "LIKE", "%$search%")
                        ->orWhereHas("student", function ($query) use ($search) {
                            $query->where("name", "LIKE", "%$search%")
                                ->orWhere("nim", "LIKE", "%$search%");
                        });
                }
            )->latest()->paginate($perpage);
        $proposal_ids = Proposal::pluck("id");
        return Inertia::render("admin/proposal/Index", [
            "proposals" => $proposals,
            "meta" => new MetaPaginateSearch($proposals, $search),
            "proposal_ids" => $proposal_ids,
        ]);
    }

    public function show(Proposal $proposal)
    {
        $file_requirements = FileRequirement::where("request_type", "proposal")->get();
        return Inertia::render("admin/proposal/Show", [
            "proposal" => new ProposalDetailResource($proposal->load(["student", "schedule", "mentors", "testers", "files"])),
            "file_requirements" => $file_requirements,
        ]);
    }
    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        $file_requirements = FileRequirement::where("request_type", "proposal")->get();
        return Inertia::render("admin/proposal/Create", [
            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function store(ProposalStoreRequest $request)
    {
        $validated = $request->validated();
        $file_requirements = FileRequirement::where("request_type", "proposal")->get();
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
            $newSchedule = Schedule::create([
                "date" => $validated["date"],
                "time_zone" => $validated["time_zone"],
                "start_time" => $validated["start_time"],
                "end_time" => $validated["end_time"],
                "location" => $validated["location"],
            ]);
            $newProposal = Proposal::create([
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
                // tambahkan logic untuk cek dulu apakah file dengan nama itu di upload atau tidak
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
            foreach ($validated["tester_ids"] as $index => $tester) {
                Tester::create([
                    "lecturer_id" => $tester,
                    "order" => $index,
                    "proposal_id" => $newProposal->id,
                ]);
            }
        });
        return to_route("admin.proposal.index")->with("success", "Data berhasil ditambahkan");
    }

    public function edit(Proposal $proposal)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();

        $file_requirements = FileRequirement::where("request_type", "proposal")->get();
        return Inertia::render("admin/proposal/Edit", [
            "proposal" => new ProposalDetailResource($proposal),

            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
            "file_requirements" => $file_requirements,
        ]);
    }

    public function update(Proposal $proposal, ProposalUpdateRequest $request)
    {
        $validated = $request->validated();
        $file_requirements = FileRequirement::where("request_type", "proposal")->get();
        $updateProposal = [
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
            if (Storage::exists($proposal->applicant_sign)) {
                Storage::delete($proposal->applicant_sign);
            }
            $updateProposal["applicant_sign"] = $request->file("applicant_sign")->storePublicly("proposal/applicant_signs", "public");
        }

        foreach ($file_requirements as $file_requirement) {
            if ($request->file($file_requirement->slug)) {
                foreach ($proposal->files as $index => $file) {
                    if ($file->name == $file_requirement->name) {
                        if (Storage::exists($file->file)) {
                            Storage::delete($file->file);
                        }
                    }
                }
                $validated[$file_requirement->slug] = $request->file($file_requirement->slug)->storePublicly("proposal/files", "public");
            } else {
                unset($validated[$file_requirement->slug]);
            }
        }
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
                "time_zone" => $validated["time_zone"],
                "start_time" => $validated["start_time"],
                "end_time" => $validated["end_time"],
                "location" => $validated["location"],
            ]);
            foreach ($proposal->mentors as $index => $mentor) {
                $mentor->update([
                    "lecturer_id" => $validated["mentor_ids"][$index],
                ]);
            }
            foreach ($proposal->testers as $index => $mentor) {
                $mentor->update([
                    "lecturer_id" => $validated["tester_ids"][$index],
                ]);
            }
            // tambahkan logic simpan path file di db jika belum ada sebelumnya
            foreach ($file_requirements as $index => $file_requirement) {
                if (array_key_exists($file_requirement->slug, $validated)) {
                    foreach ($proposal->files as $index => $file) {
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
                        //         "proposal_id" => $proposal->id,
                        //     ]);
                        // }
                    }
                }
            }
        });
        return to_route("admin.proposal.show", ["proposal" => $proposal->id])->with("warning", "Data berhasil di ubah");
    }

    public function destroy(Proposal $proposal, Request $request)
    {
        DB::transaction(function () use ($proposal) {
            $this->deleteProposal($proposal);
        });
        return to_route("admin.proposal.index")->with("error", "Data berhasil dihapus");
    }

    public function destroys(Request $request)
    {
        $validated = $request->validate([
            "ids" => "required|array|min:1",
            "ids*" => "required|exists:proposals,id",
        ]);
        DB::transaction(function () use ($validated) {
            foreach ($validated["ids"] as $id) {
                $proposal = Proposal::find($id);
                $this->deleteProposal($proposal);
            }
        });
        return to_route("admin.proposal.index")->with("error", "Data berhasil dihapus");
    }

    public function deleteProposal(Proposal $proposal)
    {
        $proposal->mentors()->delete();
        $proposal->testers()->delete();
        foreach ($proposal->files as $index => $file) {
            if (Storage::exists($file->file)) {
                Storage::delete($file->file);
            }
        }
        if (Storage::exists($proposal->applicant_sign)) {
            Storage::delete($proposal->applicant_sign);
        }
        $proposal->files()->delete();
        $proposal->delete();
        $proposal->student()->delete();
        $proposal->schedule()->delete();
    }
}
