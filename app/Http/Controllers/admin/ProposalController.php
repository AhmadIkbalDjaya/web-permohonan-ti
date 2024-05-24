<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FileRequirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index()
    {
        return Inertia::render("admin/proposal/Index");
    }
    public function create()
    {
        $file_requirements = FileRequirement::where("request_type", "proposals")->get();
        return Inertia::render("admin/proposal/Create", [
            "file_requirements" => $file_requirements,
        ]);
    }
}
