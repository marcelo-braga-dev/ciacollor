<?php

use App\Http\Controllers\Admins\Usuarios\AdminController;
use App\Http\Controllers\Admins\Usuarios\GerenteRegionalController;
use App\Http\Controllers\Admins\Usuarios\VendedoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.usuarios.')
    ->prefix('admin/usuarios')
    ->group(function () {
        Route::resource('vendedores', VendedoresController::class);
        Route::resource('gerente-regional', GerenteRegionalController::class);
        Route::resource('admins', AdminController::class);
    });
