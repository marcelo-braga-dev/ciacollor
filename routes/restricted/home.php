<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $auth = auth()->user()->funcao;
    switch ($auth) {
        case (new \App\src\Usuarios\Funcoes\AdminsUsuario())->getFuncao() :
            return Inertia::render('Admin/Home');
        case (new \App\src\Usuarios\Funcoes\GerenteRegionalUsuario())->getFuncao() :
            return Inertia::render('Gerente/Home');
        default :
        {
            auth()->logout();
            modalErro('Função do usuário não encontrado.');
            return redirect('/');
        }
    }
})->middleware(['auth', 'verified'])->name('home');

Route::any('dashboard', function () {
    return redirect('/');
})->name('dashboard');
