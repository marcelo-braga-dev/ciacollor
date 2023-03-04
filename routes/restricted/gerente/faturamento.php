<?php

use App\Http\Controllers\Gerente\Faturamento\GeralController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('gerente.faturamento.')
    ->prefix('gerente/faturamento')
    ->group(function () {
        Route::resource('vendedores', GeralController::class);

        Route::post('vendedores-filtro', [GeralController::class, 'filtrar'])
            ->name('vendedores-filtro');

        Route::post('vendedores-clientes', [GeralController::class, 'clientes'])
            ->name('vendedores-clientes');
    });
