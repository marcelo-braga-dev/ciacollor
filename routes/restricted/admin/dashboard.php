<?php

use App\Http\Controllers\Admins\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.dashboard.')
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::resource('geral', DashboardController::class);
    });
