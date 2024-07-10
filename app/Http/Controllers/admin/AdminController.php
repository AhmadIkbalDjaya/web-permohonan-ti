<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $count = [
            ...$this->count_data("proposals", "proposal"),
            ...$this->count_data("results", "result"),
            ...$this->count_data("ppls", "ppl"),
            ...$this->count_data("comprehensives", "comprehensive"),
        ];
        return Inertia::render("admin/dashboard/Index", [
            "count" => $count,
        ]);
    }

    public function count_data($table_name, $name)
    {
        $count = DB::table($table_name)->count();
        $new_count = DB::table($table_name)->where("status_id", 1)->count();
        $count = [
            "$name" . "_count" => $count,
            "new_" . $name . "_count" => $new_count,
        ];
        return $count;
    }
}
