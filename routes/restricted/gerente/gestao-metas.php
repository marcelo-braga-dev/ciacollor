<?php

use App\Http\Controllers\Gerente\GestaoMetas\GeralController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('gerente.gestao-metas.')
    ->prefix('gerente/gestao-metas')
    ->group(function () {
        Route::resource('geral', GeralController::class);
        Route::post('filtro', [GeralController::class, 'filtrar'])
            ->name('filtro');
    });
