<?php

use App\Http\Controllers\Admins\Faturamento\ClientesController;
use App\Http\Controllers\Admins\Faturamento\ProdutosController;
use App\Http\Controllers\Admins\Faturamento\VendedoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.faturamento.')
    ->prefix('admin/faturamento')
    ->group(function () {
        Route::resource('clientes', ClientesController::class);
        Route::resource('produtos', ProdutosController::class);
        Route::resource('vendedores', VendedoresController::class);

        Route::post('vendedores-filtro', [VendedoresController::class, 'filtrar'])
            ->name('vendedores-filtro');
    });
