<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateSearchRequest;
use App\Http\Resources\MetaPaginateSearch;
use App\Models\FileRequirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    public function index(PaginateSearchRequest $request)
    {
        $validated = $request->validated();
        $perpage = $validated["perpage"] ?? 10;
        $search = $validated["search"] ?? "";
        $type = $this->getTypeFromPath(explode("/", $request->getPathInfo())[2]);

        $file_requirements = FileRequirement::select("id", "name", "is_required")->where("request_type", $type)->when($search, function ($query, $search) {
            $query->where("name", "LIKE", "%$search%");
        })->latest()->paginate($perpage);
        $file_requirement_ids = FileRequirement::where("request_type", $type)->pluck("id");
        return Inertia::render("admin/file_requirement/Index", [
            "file_requirements" => $file_requirements,
            "meta" => new MetaPaginateSearch($file_requirements, $search),
            "request_type" => $type,
            "file_requirement_ids" => $file_requirement_ids,
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

    public function destroy(FileRequirement $fileRequirement)
    {
        $type = $fileRequirement->request_type;
        $fileRequirement->delete();
        return to_route("admin.$type.file_requirement")->with("error", "Data berhasil dihapus");
    }

    public function destroys(Request $request)
    {
        $type = $request["request_type"];
        $validated = $request->validate([
            "ids" => "required|array|min:1",
            "ids*" => "required|exists:file_requirements,id",
        ]);
        DB::transaction(function () use ($validated) {
            foreach ($validated["ids"] as $id) {
                $fileRequirement = FileRequirement::find($id);
                $fileRequirement->delete();
            }
        });
        return to_route("admin.$type.file_requirement")->with("error", "Data berhasil dihapus");
    }
}
