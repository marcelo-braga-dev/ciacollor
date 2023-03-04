<?php

use App\Http\Controllers\Admins\Pedidos\ImportarArquivoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->name('admin.produtos.')
    ->prefix('admin/produtos')
    ->group(function () {
        Route::resource('importar', ImportarArquivoController::class);
    });
