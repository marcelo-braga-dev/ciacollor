<?php

namespace App\Http\Controllers\Admins\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Produtos\GruposService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();

        return Inertia::render('Admin/Faturamento/Produtos/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new GruposService())->faturamento(null, $request);
    }

    public function clientes(Request $request)
    {
        $clientes = (new Produtos())->getClientes($request->gerente, $request->vendedor);

        if ($request->gerente)
            $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior($request->gerente);
        else {
            $vendedores = (new VendedoresUsuariosService())->getUsers();
        }

        return [
            'vendedores' => $vendedores,
            'clientes' => $clientes
        ];
    }
}
