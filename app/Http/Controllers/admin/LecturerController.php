<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LecturerResource;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");

        $query = Lecturer::select("id", "name", "gender", "nip", "role");

        if ($search) {
            $query->where("name", "LIKE", "%$search%")
                ->orWhere("nip", "LIKE", "%$search%")
                ->orWhere("role", "LIKE", "%$search%");
        }
        $lecturers = $query->latest()->paginate($perpage, ["*"], "page", "$page");
        $meta = [
            "page" => $lecturers->currentPage(),
            "perpage" => $lecturers->perPage(),
            "total_page" => $lecturers->lastPage(),
            "total_item" => $lecturers->total(),
            "search" => $search,
        ];
        return Inertia::render("admin/lecturer/Index", [
            "lecturers" => LecturerResource::collection($lecturers),
            "meta" => $meta,
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
            "gender" => "required|in:male,famale",
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
        if ($lecturer->signature && Storage::exists($lecturer->signature)) {
            Storage::delete($lecturer->signature);
        }
        $lecturer->delete();
        return to_route("admin.lecturer.index")->with("error", "Data berhasil dihapus");
    }
}
