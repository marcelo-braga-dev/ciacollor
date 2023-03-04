<?php

namespace App\Http\Controllers\Gerente\Usuarios;

use App\Http\Controllers\Controller;
use App\Service\Usuarios\Funcoes\GerenteRegionalUsuariosService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use App\src\Usuarios\Funcoes\VendedorUsuario;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedoresController extends Controller
{
    public function index()
    {
        $usuarios = (new VendedoresUsuariosService())->getUsersPeloSuperior(id_usuario_atual());

        return Inertia::render('Gerente/Usuarios/Vendedores/Index', compact('usuarios'));
    }

    public function create()
    {
        $gerentes = (new GerenteRegionalUsuariosService())->getNomes();

        return Inertia::render('Gerente/Usuarios/Vendedores/Create',
            compact('gerentes'));
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new VendedorUsuario());

        return redirect()->route('gerente.usuarios.vendedores.index');
    }

    public function edit($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);
        $gerentes = (new GerenteRegionalUsuariosService())->getNomes();

        return Inertia::render('Gerente/Usuarios/Vendedores/Edit',
            compact('dados', 'gerentes'));
    }

    public function show($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);

        return Inertia::render('Gerente/Usuarios/Vendedores/Show', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Usuarios())->atualizar($id, $request, new VendedorUsuario());

        return redirect()->route('gerente.usuarios.vendedores.show', $id);
    }
}
