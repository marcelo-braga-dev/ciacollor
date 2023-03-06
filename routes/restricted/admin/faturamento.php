<?php

use App\Http\Controllers\Admins\Faturamento\ClientesController;
use App\Http\Controllers\Admins\Faturamento\VendedoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.faturamento.')
    ->prefix('admin/faturamento')
    ->group(function () {
        Route::resource('vendedores', VendedoresController::class);
        Route::post('vendedores-filtro', [VendedoresController::class, 'filtrar'])
            ->name('vendedores-filtro');
        Route::post('vendedores-clientes', [VendedoresController::class, 'clientes'])
            ->name('vendedores-clientes');

        Route::resource('clientes', ClientesController::class);
        Route::post('clientes-filtro', [ClientesController::class, 'filtrar'])
            ->name('clientes-filtro');
        Route::post('clientes-clientes', [ClientesController::class, 'clientes'])
            ->name('clientes-clientes');
    });
