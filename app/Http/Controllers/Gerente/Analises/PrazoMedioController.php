<?php

namespace App\Http\Controllers\Gerente\Analises;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Analises\PrazoMedioService;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrazoMedioController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();

        return Inertia::render('Gerente/Analises/PrazoMedio/Index',
            compact('usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new PrazoMedioService())->calcular($request, id_usuario_atual());
    }

    public function clientes(Request $request)
    {
        $gerente = id_usuario_atual();
        $clientes = (new Produtos())->getClientes($gerente, $request->vendedor);

        $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior($gerente);

        return [
            'vendedores' => $vendedores,
            'clientes' => $clientes
        ];
    }
}
