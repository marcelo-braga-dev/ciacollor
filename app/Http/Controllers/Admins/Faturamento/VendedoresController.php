<?php

namespace App\Http\Controllers\Admins\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedoresController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();

        return Inertia::render('Admin/Faturamento/Vendedores/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new FaturamentoService())->faturamento($request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
