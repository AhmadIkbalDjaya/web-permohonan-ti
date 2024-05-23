<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\public\ComprehensiveController;
use App\Http\Controllers\public\HomeController;
use App\Http\Controllers\public\PplController;
use App\Http\Controllers\public\ProposalController;
use App\Http\Controllers\public\ResultController;
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
Route::get("hasil", fn() => [ResultController::class, "index"])->name("result");
Route::get("kompren", fn() => [ComprehensiveController::class, "index"])->name("comprenhensive");
Route::get("ppl", fn() => [PplController::class, "index"])->name("ppl");

Route::prefix('admin')->group(function () {
    Route::get("", [AdminController::class, "dashboard"])->name('admin.home');
});