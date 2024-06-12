<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PPLDetailResource;
use App\Models\Lecturer;
use App\Models\PPL;
use App\Models\PplStudent;
use App\Models\Status;
use App\Models\StatusDescription;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PplController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");

        $query = PPL::select("id", "location", "created_at", "status_id")
            ->with([
                "students" => fn($query) => $query->select("students.id", "students.name", "students.nim"),
                "status" => fn($query) => $query->select("id", "name"),
            ]);
        if ($search) {
            $query->where('location', "LIKE", "%$search%")
                ->orWhereHas("students", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%$search%")
                        ->orWhere("nim", "LIKE", "%$search%");
                });
        }
        $ppls = $query->latest()->paginate($perpage, ["*"], 'page', $page);
        $meta = [
            "page" => $ppls->currentPage(),
            "perpage" => $ppls->perPage(),
            "total_page" => $ppls->lastPage(),
            "total_item" => $ppls->total(),
            "search" => $search,
        ];
        return Inertia::render("admin/ppl/Index", [
            "ppls" => $ppls,
            "meta" => $meta,
        ]);
    }

    public function show(PPL $ppl)
    {
        return Inertia::render("admin/ppl/Show", [
            "ppl" => new PPLDetailResource($ppl),
        ]);
    }

    public function create()
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        return Inertia::render("admin/ppl/Create", [
            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number_mentor" => "nullable",
            "letter_number_introduction" => "nullable",
            "letter_date" => "nullable|date",
            "addressed_to" => "nullable|string",
            "mentor_id" => "nullable|exists:lecturers,id",

            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "student_count" => "required|numeric|min:1",

            "names" => "required|array|min:" . $request->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|min:" . $request->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|min:" . $request->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|min:" . $request->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|min:" . $request->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|min:" . $request->student_count,
            "phones.*" => "required|phone:ID",
        ]);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl/applicant_signs", "public");

        DB::transaction(function () use ($validated) {
            $newPpl = PPL::create([
                "status_id" => $validated["status_id"],
                "status_description_id" => $validated["status_description_id"],
                "letter_number_mentor" => $validated["letter_number_mentor"],
                "letter_number_introduction" => $validated["letter_number_introduction"],
                "letter_date" => $validated["letter_date"],
                "addressed_to" => $validated["addressed_to"],
                "mentor_id" => $validated["mentor_id"],

                "start_date" => $validated["start_date"],
                "end_date" => $validated["end_date"],
                "location" => $validated["location"],
                "location_address" => $validated["location_address"],
                "applicant_sign" => $validated["applicant_sign"],
            ]);
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
                    "ppl_id" => $newPpl->id,
                    "student_id" => $newStudent->id,
                ]);
            }
        });
        return to_route("admin.ppl.index");
    }

    public function edit(PPL $ppl)
    {
        $statuses = Status::select("id", "name")->get();
        $status_descriptions = StatusDescription::select("id", "status_id", "description")->get();
        $lecturers = Lecturer::select("id", "name")->orderBy("name")->get();
        return Inertia::render("admin/ppl/Edit", [
            "ppl" => new PPLDetailResource($ppl),

            "lecturers" => $lecturers,
            "statuses" => $statuses,
            "status_descriptions" => $status_descriptions,
        ]);
    }

    public function update(PPL $ppl, Request $request)
    {
        $validated = $request->validate([
            "status_id" => "nullable|exists:statuses,id",
            "status_description_id" => "nullable|exists:status_descriptions,id",
            "letter_number_mentor" => "nullable",
            "letter_number_introduction" => "nullable",
            "letter_date" => "nullable|date",
            "addressed_to" => "nullable|string",
            "mentor_id" => "nullable|exists:lecturers,id",

            "start_date" => "required",
            "end_date" => "required",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "nullable|image",
            "student_count" => "numeric|min:1",

            "names" => "required|array|min:" . $request->student_count,
            "names.*" => "required|string",
            "nims" => "required|array|min:" . $request->student_count,
            "nims.*" => "required|numeric",
            "pobs" => "required|array|min:" . $request->student_count,
            "pobs.*" => "required|string",
            "dobs" => "required|array|min:" . $request->student_count,
            "dobs.*" => "required|date",
            "semesters" => "required|array|min:" . $request->student_count,
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|min:" . $request->student_count,
            "phones.*" => "required|phone:ID",
        ]);
        $updatePpl = [
            "status_id" => $validated["status_id"],
            "status_description_id" => $validated["status_description_id"],
            "letter_number_mentor" => $validated["letter_number_mentor"],
            "letter_number_introduction" => $validated["letter_number_introduction"],
            "letter_date" => $validated["letter_date"],
            "addressed_to" => $validated["addressed_to"],
            "mentor_id" => $validated["mentor_id"],

            "start_date" => $validated["start_date"],
            "end_date" => $validated["end_date"],
            "location" => $validated["location"],
            "location_address" => $validated["location_address"],
        ];
        if ($request->file("applicant_sign")) {
            if (Storage::exists($ppl->applicant_sign)) {
                Storage::delete($ppl->applicant_sign);
            }
            $updatePpl["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl/applicant_signs", "public");
        }
        DB::transaction(function () use ($ppl, $updatePpl, $validated) {
            $ppl->update($updatePpl);
            $ppl->students()->delete();
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
                    "ppl_id" => $ppl->id,
                    "student_id" => $newStudent->id,
                ]);
            }
        });
        return to_route("admin.ppl.show", ["ppl" => $ppl->id]);
    }
    public function destroy(PPL $ppl)
    {
        DB::transaction(function () use ($ppl) {
            $ppl->mentor()->delete();
            $ppl->students()->delete();
            if (Storage::exists($ppl->applicant_sign)) {
                Storage::delete($ppl->applicant_sign);
            }
            $ppl->delete();
        });
        return to_route("admin.ppl.index");
    }
}
