<?php

namespace App\Http\Controllers\Admins\Analises;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Analises\DescontoMedioService;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DescontoMedioController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();
//print_pre( (new DescontoMedioService())->calcular($request));
        return Inertia::render('Admin/Analises/DescontoMedio/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new DescontoMedioService())->calcular($request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
