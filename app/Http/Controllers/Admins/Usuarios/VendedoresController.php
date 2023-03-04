<?php

namespace App\Http\Controllers\Admins\Usuarios;

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
        $usuarios = (new VendedoresUsuariosService())->getUsers();

        return Inertia::render('Admin/Usuarios/Vendedores/Index', compact('usuarios'));
    }

    public function create()
    {
        $gerentes = (new GerenteRegionalUsuariosService())->getNomes();

        return Inertia::render('Admin/Usuarios/Vendedores/Create',
            compact('gerentes'));
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new VendedorUsuario());

        return redirect()->route('admin.usuarios.vendedores.index');
    }

    public function edit($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);
        $gerentes = (new GerenteRegionalUsuariosService())->getNomes();

        return Inertia::render('Admin/Usuarios/Vendedores/Edit',
            compact('dados', 'gerentes'));
    }

    public function show($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);

        return Inertia::render('Admin/Usuarios/Vendedores/Show', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Usuarios())->atualizar($id, $request, new VendedorUsuario());

        return redirect()->route('admin.usuarios.vendedores.show', $id);
    }
}
