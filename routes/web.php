<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__.'/settings.php';
