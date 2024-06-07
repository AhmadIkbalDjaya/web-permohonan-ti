<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Models\Proposal;
use App\Models\Result;
use App\Models\Comprehensive;
use App\Models\PPL;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StatusCheckController extends Controller
{
    public function index()
    {
        return Inertia::render('public/status/check/Index');
    }

    public function check(Request $request)
    {
        $validated = $request->validate([
            "code" => "required",
        ]);
        $type = explode("-", $request->code)[0];
        switch ($type) {
            case '#PRO':
                $model = Proposal::class;
                break;
            case '#HSL':
                $model = Result::class;
                break;
            case '#KPR':
                $model = Comprehensive::class;
                break;
            case '#PPL':
                $model = PPL::class;
                break;
            default:
                return throw ValidationException::withMessages(["code" => "code tidak valid"]);
        }
        $result = $model::where("code", $validated["code"])
            ->with([
                "status" => fn($query) => $query->select("id", "name"),
                "status_description" => fn($query) => $query->select("id", "description"),
            ])->first();
        if (!$result) {
            return throw ValidationException::withMessages(["code" => "Data tidak ditemukan"]);
        }
        $status = [
            "status_id" => $result->status_id,
            "name" => $result->status->name,
            "description" => $result->status_description->description ?? null,
        ];
        session()->flash("message", $status);
    }
}
