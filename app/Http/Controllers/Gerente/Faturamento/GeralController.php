<?php

namespace App\Http\Controllers\Gerente\Faturamento;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeralController extends Controller
{
    public function index()
    {
        $usuarios = (new UsuariosService())->getVendedoresDoGerente(id_usuario_atual());

        return Inertia::render('Gerente/Faturamento/Vendedores/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new FaturamentoService())->faturamento($request, id_usuario_atual());
    }

    public function clientes()
    {
        return (new Produtos())->getClientesUsuario(id_usuario_atual());
    }
}
