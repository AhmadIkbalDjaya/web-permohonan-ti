<?php

use App\Http\Controllers\public\ComprehensiveController;
use App\Http\Controllers\public\HomeController;
use App\Http\Controllers\public\PplController;
use App\Http\Controllers\public\ProposalController;
use App\Http\Controllers\public\ResultController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\ProposalController as AdminProposalController;
use App\Http\Controllers\admin\ResultController as AdminResultController;
use App\Http\Controllers\admin\ComprehensiveController as AdminComprehensiveController;
use App\Http\Controllers\admin\PplController as AdminPplController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get("proposal", [ProposalController::class, "index"])->name("proposal");
Route::get("hasil", [ResultController::class, "index"])->name("result");
Route::get("kompren", [ComprehensiveController::class, "index"])->name("comprenhensive");
Route::get("ppl", [PplController::class, "index"])->name("ppl");

Route::prefix('admin')->group(function () {
    Route::get("", [AdminController::class, "dashboard"])->name('admin.home');
    Route::controller(AdminProposalController::class)->group(function () {
        Route::get("proposal", "index")->name('admin.proposal.index');
        Route::get("proposal/create", "create")->name('admin.proposal.create');
        Route::post("proposal", 'store')->name('admin.proposal.store');
        Route::get("proposal/{proposal}/edit", "edit")->name('admin.proposal.edit');
        // Route::put("proposal/{proposal}", "update")->name('admin.proposal.update');
    });
    Route::get("hasil", [AdminResultController::class, "index"])->name('admin.result.index');
    Route::get("kompren", [AdminComprehensiveController::class, "index"])->name('admin.comprehensive.index');
    Route::get("ppl", [AdminPplController::class, "index"])->name('admin.ppl.index');
});