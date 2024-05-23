<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
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
        return Inertia::render("public/ppl/Index");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "student_count" => "required|integer|min:1",
            "names" => "required|array|size:" . count($request->student_count),
            "names.*" => "required",
            "nims" => "required|array|size:" . count($request->student_count),
            "nim.*" => "required|numeric",
            "pobs" => "required|array|size:" . count($request->student_count),
            "pobs.*" => "required|string",
            "dobs" => "required|array|size:" . count($request->student_count),
            "dobs.*" => "required|date",
            "semesters" => "required|array|size:" . count($request->student_count),
            "semesters.*" => "required|integer|min:0",
            "phones" => "required|array|size:" . count($request->student_count),
            "phones.*" => "required|regex:^(\+62|62|0)8[1-9][0-9]{6,9}$",
            "start_date" => "required|date",
            "end_date" => "required|date",
            "location" => "required|string",
            "location_address" => "required|string",
            "applicant_sign" => "required",
        ]);
        $validated["applicant_sign"] = $request->file("applicant_sign")->storePublicly("ppl", "public");
        DB::transaction(function () use ($validated) {
            $newPPL = PPL::create([
                "start_date" => $validated["start_date"],
                "end_date" => $validated["end_date"],
                "location" => $validated["location"],
                "location_address" => $validated["location_address"],
                "applicant_sign" => $validated["applicant_sign"],
            ]);
            foreach ($validated["student_count"] as $index => $student) {
                $newStudent = Student::create([
                    "name" => $validated["names"][$index],
                    "nim" => $validated["nims"][$index],
                    "pob" => $validated["pobs"][$index],
                    "dob" => $validated["dobs"][$index],
                    "semester" => $validated["semesters"][$index],
                    "phone" => $validated["phones"][$index],
                ]);
                PplStudent::create([
                    "student_id" => $newStudent->id,
                    "ppl_id"->$newPPL->id,
                ]);
            }
        });
        return redirect()->route('home');
    }
}
