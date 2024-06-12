<?php

use App\Http\Controllers\Admin\AuthenticateController;
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
use App\Http\Controllers\public\StatusCheckController;
use Illuminate\Support\Facades\Route;

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
Route::post("proposal", [ProposalController::class, "store"])->name("proposal.store");
Route::get("hasil", [ResultController::class, "index"])->name("result");
Route::post("hasil", [ResultController::class, "store"])->name("result.store");
Route::get("kompren", [ComprehensiveController::class, "index"])->name("comprehensive");
Route::post("kompren", [ComprehensiveController::class, "store"])->name("comprehensive.store");
Route::get("ppl", [PplController::class, "index"])->name("ppl");
Route::post("ppl", [PplController::class, "store"])->name("ppl.store");
Route::get("status-check", [StatusCheckController::class, "index"])->name("status");
Route::post("status-check", [StatusCheckController::class, "check"])->name("status.check");

Route::prefix('admin')->group(function () {
    Route::controller(AuthenticateController::class)->group(function () {
        Route::get('login', 'index')->name("login")->middleware("guest");
        Route::post('login', 'login')->name("login.check")->middleware("guest");
        Route::get('logout', 'logout')->name("logout")->middleware("auth");
    });
    Route::middleware(['auth'])->group(function () {
        Route::get("", [AdminController::class, "dashboard"])->name('admin.home');
        Route::prefix("proposal")->controller(AdminProposalController::class)->group(function () {
            Route::get("", "index")->name('admin.proposal.index');
            Route::get("create", "create")->name('admin.proposal.create');
            Route::post("", 'store')->name('admin.proposal.store');
            Route::get('{proposal}', "show")->name('admin.proposal.show');
            Route::get("{proposal}/edit", "edit")->name('admin.proposal.edit');
            Route::put("{proposal}", "update")->name('admin.proposal.update');
            Route::delete("{proposal}", "destroy")->name('admin.proposal.delete');
        });
        Route::prefix("hasil")->controller(AdminResultController::class)->group(function () {
            Route::get("", "index")->name('admin.result.index');
            Route::get("create", "create")->name('admin.result.create');
            Route::post("", 'store')->name('admin.result.store');
            Route::get('{result}', "show")->name('admin.result.show');
            Route::get("{result}/edit", "edit")->name('admin.result.edit');
            Route::put("{result}", "update")->name('admin.result.update');
            Route::delete("{result}", "destroy")->name('admin.result.delete');
        });
        Route::prefix("kompren")->controller(AdminComprehensiveController::class)->group(function () {
            Route::get("", "index")->name('admin.comprehensive.index');
            Route::get("create", "create")->name('admin.comprehensive.create');
            Route::post("", 'store')->name('admin.comprehensive.store');
            Route::get('{comprehensive}', "show")->name('admin.comprehensive.show');
            Route::get("{comprehensive}/edit", "edit")->name('admin.comprehensive.edit');
            Route::put("{comprehensive}", "update")->name('admin.comprehensive.update');
            Route::delete("{comprehensive}", "destroy")->name('admin.comprehensive.delete');
        });
        Route::prefix("ppl")->controller(AdminPplController::class)->group(function () {
            Route::get("", "index")->name('admin.ppl.index');
            Route::get("create", "create")->name('admin.ppl.create');
            Route::post("", 'store')->name('admin.ppl.store');
            Route::get('{ppl}', "show")->name('admin.ppl.show');
            Route::get("{ppl}/edit", "edit")->name('admin.ppl.edit');
            Route::put("{ppl}", "update")->name('admin.ppl.update');
            Route::delete("{ppl}", "destroy")->name('admin.ppl.delete');
        });
    });
});