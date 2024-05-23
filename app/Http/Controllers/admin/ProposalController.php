<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index() {
        return Inertia::render("admin/proposal/Index");
    }
}
