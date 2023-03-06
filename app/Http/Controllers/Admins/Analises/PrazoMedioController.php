<?php

namespace App\Http\Controllers\Admins\Analises;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrazoMedioController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();

        return Inertia::render('Admin/Analises/PrazoMedio/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new FaturamentoService())->faturamentoVendedor($request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
