<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileRequirementController extends Controller
{
    public function getTypeFromPath($path)
    {
        if ($path == "proposal") {
            return "proposal";
        } elseif ($path == "hasil") {
            return "result";
        } elseif ($path == "kompren") {
            return "comprehensive";
        } elseif ($path == "ppl") {
            return "ppl";
        } else {
            return "proposal";
        }
    }
    public function index(Request $request)
    {
        // dd($request->getPathInfo());
        $page = $request->input("page", 1);
        $perpage = $request->input("perpage", 10);
        $search = $request->input("search", "");
        // dd(explode("/", $request->getPathInfo()));
        $type = $this->getTypeFromPath(explode("/", $request->getPathInfo())[2]);
        // dd($type);

        $query = FileRequirement::where("request_type", $type)
            ->select("id", "name", "is_required");
        if ($search) {
            $query->where("name", "LIKE", "%$search%");
        }
        $file_requirements = $query->latest()->paginate($perpage, ["*"], 'page', $page);
        $meta = [
            "page" => $file_requirements->currentPage(),
            "perpage" => $file_requirements->perPage(),
            "total_page" => $file_requirements->lastPage(),
            "total_item" => $file_requirements->total(),
            "search" => $search,
        ];
        return Inertia::render("admin/file_requirement/Index", [
            "file_requirements" => $file_requirements,
            "meta" => $meta,
            "request_type" => $type,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "is_required" => "required|boolean",
            "request_type" => "required|in:proposal,result,comprehensive,ppl"
        ]);
        FileRequirement::create($validated);
        return to_route("admin." . $validated["request_type"] . ".file_requirement")->with("success", "Data berhasil ditambahkan");
    }

    public function update(FileRequirement $fileRequirement, Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "is_required" => "required|boolean",
            "request_type" => "required|in:proposal,result,comprehensive,ppl"
        ]);
        $fileRequirement->update($validated);
        return to_route("admin." . $validated["request_type"] . ".file_requirement")->with("warning", "Data berhasil di ubah");
    }

    public function destroy(FileRequirement $fileRequirement, Request $request)
    {
        $type = $fileRequirement->request_type;
        $fileRequirement->delete();
        return to_route("admin.$type.file_requirement")->with("error", "Data berhasil dihapus");
    }
}
