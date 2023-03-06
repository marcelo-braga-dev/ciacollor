<?php

use App\Http\Controllers\Gerente\GestaoMetas\GeralController;
use App\Http\Controllers\Gerente\GestaoMetas\VendedoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('gerente.gestao-metas.')
    ->prefix('gerente/gestao-metas')
    ->group(callback: function () {
        Route::resource('geral', GeralController::class);
        Route::post('filtro', [GeralController::class, 'filtrar'])
            ->name('filtro');

        Route::resource('vendedores', VendedoresController::class);
    });
