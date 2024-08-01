<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CalendarScheduleResource;
use App\Models\Schedule;
use Carbon\Carbon;
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
        $chart = [
            "data" => [
                [
                    "name" => "Proposal",
                    "data" => $this->calculate_data_every_month("proposals"),
                ],
                [
                    "name" => "Hasil",
                    "data" => $this->calculate_data_every_month("results"),
                ],
                [
                    "name" => "Kompren",
                    "data" => $this->calculate_data_every_month("comprehensives"),
                ],
                [
                    "name" => "PPL",
                    "data" => $this->calculate_data_every_month("ppls"),
                ],
            ],
        ];
        $schedules = Schedule::whereNotNull("date")->whereNotNull("start_time")->get();
        $calendar = [
            "schedules" => CalendarScheduleResource::collection($schedules),
        ];

        return Inertia::render("admin/dashboard/Index", [
            "count" => $count,
            "chart" => $chart,
            "calendar" => $calendar,
        ]);
    }

    public function count_data($table_name, $name)
    {
        $count = DB::table($table_name)->count();
        $new_count = DB::table($table_name)->where("status_id", 1)->count();
        $count = [
            $name . "_count" => $count,
            "new_" . $name . "_count" => $new_count,
        ];
        return $count;
    }

    public function calculate_data_every_month($table_name)
    {
        $monthly = array_fill(0, 11, 0);
        $proposal_chart = DB::table($table_name)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', Carbon::now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        foreach ($proposal_chart as $index => $item) {
            $monthly[$item->month - 1] = $item->count;
        }
        return $monthly;
    }
}
