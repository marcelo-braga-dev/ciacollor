<?php

use App\Http\Controllers\Gerente\Analises\DescontoMedioController;
use App\Http\Controllers\Gerente\Analises\McController;
use App\Http\Controllers\Gerente\Analises\PrazoMedioController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('gerente.analise.')
    ->prefix('gerente/analise')
    ->group(function () {
        Route::resource('prazo-medio', PrazoMedioController::class);
        Route::post('prazo-medio-filtro', [PrazoMedioController::class, 'filtrar'])
            ->name('prazo-medio-filtro');
        Route::post('prazo-medio-clientes', [PrazoMedioController::class, 'clientes'])
            ->name('prazo-medio-clientes');

        Route::resource('mc', McController::class);
        Route::post('mc-filtro', [McController::class, 'filtrar'])
            ->name('mc-filtro');
        Route::post('mc-clientes', [McController::class, 'clientes'])
            ->name('mc-clientes');

        Route::resource('desconto-medio', DescontoMedioController::class);
        Route::post('desconto-medio-filtro', [DescontoMedioController::class, 'filtrar'])
            ->name('desconto-medio-filtro');
        Route::post('desconto-medio-clientes', [DescontoMedioController::class, 'clientes'])
            ->name('desconto-medio-clientes');
    });
