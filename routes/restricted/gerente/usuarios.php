<?php

use App\Http\Controllers\Gerente\Usuarios\VendedoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('gerente.usuarios.')
    ->prefix('gerente/usuarios')
    ->group(function () {
        Route::resource('vendedores', VendedoresController::class);
    });
