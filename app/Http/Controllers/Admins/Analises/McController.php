<?php

namespace App\Http\Controllers\Admins\Analises;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Service\Analises\McService;
use App\Service\Produtos\FaturamentoService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class McController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = (new UsuariosService())->todosUsuarios();
//print_pre((new McService())->calcular($request));
        return Inertia::render('Admin/Analises/Mc/Index',
            compact( 'usuarios'));
    }

    public function filtrar(Request $request)
    {
        return (new McService())->calcular($request);
    }

    public function clientes()
    {
        return (new Produtos())->getClientes();
    }
}
