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
    return Inertia::render('Public/Home/Index');
});

Route::get("proposal", fn () => Inertia::render('Public/Proposal/Index'))->name("proposal");
Route::get("hasil", fn () => Inertia::render('Public/Result/Index'))->name("result");
Route::get("kompren", fn () => Inertia::render('Public/Comprehensive/Index'))->name("comprenhensive");
Route::get("ppl", fn () => Inertia::render('Public/Ppl/Index'))->name("ppl");
