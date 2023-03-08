<?php

namespace App\Http\Controllers\Admins\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Produtos\GruposService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();
//print_pre((new GruposService())->faturamento(null, $request));
        return Inertia::render('Admin/Faturamento/Produtos/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new GruposService())->faturamento(null, $request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
