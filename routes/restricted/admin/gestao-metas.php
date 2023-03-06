<?php

use App\Http\Controllers\Admins\GestaoMetas\VendedoresController;
use App\Http\Controllers\Admins\GestaoMetas\GestaoMetasController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.gestao-metas.')
    ->prefix('admin/gestao-metas')
    ->group(function () {
        Route::resource('geral', GestaoMetasController::class);
        Route::post('filtro', [GestaoMetasController::class, 'filtrar'])
            ->name('filtro');

        Route::resource('vendedores', VendedoresController::class);
    });
