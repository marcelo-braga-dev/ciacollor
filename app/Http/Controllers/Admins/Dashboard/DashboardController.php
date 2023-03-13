<?php

namespace App\Http\Controllers\Admins\Dashboard;

use App\Http\Controllers\Controller;
use App\Service\Analises\PrazoMedioService;
use App\Service\Analises\ProdutosService;
use App\Service\Dashboard\TopGerentesService;
use App\Service\Dashboard\TopVendedoreservice;
use App\Service\Faturamento\VendedoresFaturamentoService;
use App\Service\Produtos\GruposService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard/Index');
    }

    public function filtrar(Request $request)
    {
        $produtos = (new ProdutosService())->calcular($request);
        $gerentes = (new TopGerentesService())->calcular($request);
        $vendedores = (new TopVendedoreservice())->calcular($request);

        return [
            'produtos' => $produtos,
            'gerentes' => $gerentes,
            'vendedores' => $vendedores
        ];
    }

    public function usuarios(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();
        if ($request->gerente)
            $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior($request->gerente);
        else {
            $vendedores = (new VendedoresUsuariosService())->getUsers();
        }

        $grupos = (new GruposService())->getGrupos();

        return [
            'gerentes' => $usuarios['gerente_regional'],
            'vendedores' => $vendedores,
            'grupos' => $grupos
        ];
    }
}
