<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PPLDetailResource;
use App\Models\Mentor;
use App\Models\PPL;
use App\Models\PplStudent;
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

        $query = PPL::select("id", "location", "created_at")
            ->with(["students" => fn($query) => $query->select("students.id", "students.name", "students.nim")]);
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
        return Inertia::render("admin/ppl/Create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "required|image",
            "mentor" => "nullable|string",
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
            $newMentor = Mentor::create([
                "name" => $validated["mentor"],
                "order" => 0,
            ]);
            $newPpl = PPL::create([
                "start_date" => $validated["start_date"],
                "end_date" => $validated["end_date"],
                "location" => $validated["location"],
                "location_address" => $validated["location_address"],
                "applicant_sign" => $validated["applicant_sign"],
                "mentor_id" => $newMentor->id,
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
        return Inertia::render("admin/ppl/Edit", [
            "ppl" => $ppl->load(["mentor", "students"])
        ]);
    }

    public function update(PPL $ppl, Request $request)
    {
        $validated = $request->validate([
            "start_date" => "required",
            "end_date" => "required",
            "location" => "required",
            "location_address" => "required",
            "applicant_sign" => "nullable|image",
            "mentor" => "nullable|string",
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
            $ppl->mentor->update([
                "name" => $validated["mentor"],
            ]);
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
        return to_route("admin.ppl.index");
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
