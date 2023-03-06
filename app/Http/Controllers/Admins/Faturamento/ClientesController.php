<?php

namespace App\Http\Controllers\Admins\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\ClienteFaturamentoService;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientesController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();

//       print_pre( (new ClienteFaturamentoService())->faturamentoCliente($request));
        return Inertia::render('Admin/Faturamento/Clientes/Index',
            compact('usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new ClienteFaturamentoService())->faturamentoCliente($request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
