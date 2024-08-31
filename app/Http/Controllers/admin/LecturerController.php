<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateSearchRequest;
use App\Http\Resources\Admin\LecturerResource;
use App\Http\Resources\MetaPaginateSearch;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginateSearchRequest $request)
    {
        $validated = $request->validated();
        $perpage = $validated["perpage"] ?? 10;
        $search = $validated["search"] ?? "";

        $lecturers = Lecturer::select("id", "name", "gender", "nip", "role")->when($search, function ($query, $search) {
            $query->where("name", "LIKE", "%$search%")
                ->orWhere("nip", "LIKE", "%$search%")
                ->orWhere("role", "LIKE", "%$search%");
        })->latest()->paginate($perpage);
        $lecturer_ids = Lecturer::pluck("id");
        return Inertia::render("admin/lecturer/Index", [
            "lecturers" => LecturerResource::collection($lecturers),
            "meta" => new MetaPaginateSearch($lecturers, $search),
            "lecturer_ids" => $lecturer_ids,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("admin/lecturer/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "gender" => "required|in:male,female",
            "nip" => "nullable",
            "role" => "required|in:head,secretary,lecturer,staff",
            "signature" => "required_if:role,head,secretary|image",
        ]);
        if ($request->file("signature")) {
            $validated["signature"] = $request->file("signature")->storePublicly("lecturer/signatures", "public");
        } else {
            unset($validated["signature"]);
        }
        Lecturer::create($validated);
        return to_route("admin.lecturer.index")->with("success", "Data berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Lecturer $lecturer)
    {
        return Inertia::render("admin/lecturer/Show", [
            "lecturer" => new LecturerResource($lecturer),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lecturer $lecturer)
    {
        return Inertia::render("admin/lecturer/Edit", [
            "lecturer" => new LecturerResource($lecturer),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lecturer $lecturer)
    {
        $validated = $request->validate([
            "name" => "required",
            "gender" => "required|in:male,female",
            "nip" => "nullable",
            "role" => "required|in:head,secretary,lecturer,staff",
            "signature" => "required_if:role,head,secretary|image",
        ]);
        if ($request->file("signature")) {
            $validated["signature"] = $request->file("signature")->storePublicly("lecturer/signatures", "public");
            if (Storage::exists($lecturer->signature)) {
                Storage::delete($lecturer->signature);
            }
        } else {
            unset($validated["signature"]);
        }
        $lecturer->update($validated);
        return to_route("admin.lecturer.show", ["lecturer" => $lecturer->id])->with("warning", "Data berhasil di ubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lecturer $lecturer)
    {
        $this->deleteLecturer($lecturer);
        return to_route("admin.lecturer.index")->with("error", "Data berhasil dihapus");
    }

    public function destroys(Request $request)
    {
        $validated = $request->validate([
            "ids" => "required|array|min:1",
            "ids*" => "required|exists:lecturers,id",
        ]);
        DB::transaction(function () use ($validated) {
            foreach ($validated["ids"] as $id) {
                $lecturer = Lecturer::find($id);
                $this->deleteLecturer($lecturer);
            }
        });
        return to_route("admin.lecturer.index")->with("error", "Data berhasil dihapus");
    }

    public function deleteLecturer(Lecturer $lecturer)
    {
        if ($lecturer->signature && Storage::exists($lecturer->signature)) {
            Storage::delete($lecturer->signature);
        }
        $lecturer->delete();
    }
}
