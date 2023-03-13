<?php

use App\Http\Controllers\Admins\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.dashboard.')
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::resource('geral', DashboardController::class);
        Route::post('relatorios-filtro', [DashboardController::class, 'filtrar'])
            ->name('relatorios-filtro');

        Route::post('relatorios-filtro-usuarios', [DashboardController::class, 'usuarios'])
            ->name('relatorios-filtro-usuarios');
    });
