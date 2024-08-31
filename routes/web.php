<?php

use App\Http\Controllers\admin\{
    AdminController,
    AuthenticateController,
    FileRequirementController,
    LecturerController,
    ProposalController as AdminProposalController,
    ResultController as AdminResultController,
    ComprehensiveController as AdminComprehensiveController,
    PplController as AdminPplController,
};
use App\Http\Controllers\public\{
    ComprehensiveController,
    HomeController,
    PplController,
    ProposalController,
    ResultController,
    StatusCheckController,
};
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

        Route::prefix("proposal")->name("admin.proposal.")->group(function () {
            Route::get('file_requirement', [FileRequirementController::class, "index"])->name('file_requirement');
            Route::delete('destroys', [AdminProposalController::class, "destroys"])->name("destroys");
            Route::resource('', AdminProposalController::class)->parameters(["" => "proposal"]);
        });

        Route::prefix("hasil")->name("admin.result.")->group(function () {
            Route::get('file_requirement', [FileRequirementController::class, "index"])->name('file_requirement');
            Route::delete('destroys', [AdminResultController::class, "destroys"])->name("destroys");
            Route::resource('', AdminResultController::class)->parameters(["" => "result"]);
        });

        Route::prefix("kompren")->name("admin.comprehensive.")->controller(AdminComprehensiveController::class)->group(function () {
            Route::get('file_requirement', [FileRequirementController::class, "index"])->name('file_requirement');
            Route::delete('destroys', [AdminComprehensiveController::class, "destroys"])->name("destroys");
            Route::resource('', AdminComprehensiveController::class)->parameters(["" => "comprehensive"]);
        });

        Route::prefix("ppl")->name("admin.ppl.")->controller(AdminPplController::class)->group(function () {
            Route::get('file_requirement', [FileRequirementController::class, "index"])->name('file_requirement');
            Route::delete('destroys', [AdminPplController::class, "destroys"])->name("destroys");
            Route::resource('', AdminPplController::class)->parameters(["" => "ppl"]);
        });

        Route::delete('file-requirement/destroys', [FileRequirementController::class, "destroys"])->name("admin.file-requirement.destroys");
        Route::resource('file-requirement', FileRequirementController::class)->only(["store", "update", "destroy"])->names("admin.file-requirement");
        Route::delete('lecturer/destroys', [LecturerController::class, "destroys"])->name("admin.lecturer.destroys");
        Route::resource('lecturer', LecturerController::class)->names("admin.lecturer");
    });
});