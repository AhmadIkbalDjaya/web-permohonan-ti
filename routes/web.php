<?php

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

Route::get('/', function () {
    return Inertia::render('public/home/Index');
})->name('home');

Route::get("proposal", fn() => Inertia::render('public/proposal/Index'))->name("proposal");
Route::get("hasil", fn() => Inertia::render('public/result/Index'))->name("result");
Route::get("kompren", fn() => Inertia::render('public/comprehensive/Index'))->name("comprenhensive");
Route::get("ppl", fn() => Inertia::render('public/ppl/Index'))->name("ppl");

Route::prefix('admin')->group(function () {
    Route::get("", fn() => Inertia::render("admin/dashboard/Index"))->name('admin.home');
});