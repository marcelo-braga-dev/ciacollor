<?php

namespace App\Http\Controllers\Admins\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Produtos\ProdutosService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedoresController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();
        $clientes = (new Produtos())->getClientes();

        return Inertia::render('Admin/Faturamento/Vendedores/Index',
            compact( 'usuarios', 'clientes'));
    }

    public function filtrar(Request $request)
    {
        return (new FaturamentoService())->faturamento($request);
    }
}
