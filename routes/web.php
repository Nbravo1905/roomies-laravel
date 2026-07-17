<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SpaceAdminController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('spaces', [SpaceAdminController::class, 'index'])->name('spaces.index');
    Route::post('spaces', [SpaceAdminController::class, 'store'])->name('spaces.store');
    Route::put('spaces/{space}', [SpaceAdminController::class, 'update'])->name('spaces.update');
});

require __DIR__.'/settings.php';
