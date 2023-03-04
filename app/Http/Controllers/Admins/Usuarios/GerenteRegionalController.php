<?php

namespace App\Http\Controllers\Admins\Usuarios;

use App\Http\Controllers\Controller;
use App\Service\Usuarios\Funcoes\GerenteRegionalUsuariosService;
use App\src\Usuarios\Funcoes\GerenteRegionalUsuario;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GerenteRegionalController extends Controller
{
    public function index()
    {
        $usuarios = (new GerenteRegionalUsuariosService())->getUsers();

        return Inertia::render('Admin/Usuarios/GerenteRegional/Index', compact('usuarios'));
    }

    public function create()
    {
        return Inertia::render('Admin/Usuarios/GerenteRegional/Create');
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new GerenteRegionalUsuario());

        return redirect()->route('admin.usuarios.gerente-regional.index');
    }

    public function edit($id)
    {
        $dados = (new GerenteRegionalUsuariosService())->getUser($id);

        return Inertia::render('Admin/Usuarios/GerenteRegional/Edit',
            compact('dados'));
    }

    public function show($id)
    {
        $dados = (new GerenteRegionalUsuariosService())->getUser($id);

        return Inertia::render('Admin/Usuarios/GerenteRegional/Show', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Usuarios())->atualizar($id, $request, new GerenteRegionalUsuario());

        return redirect()->route('admin.usuarios.gerente-regional.show', $id);
    }
}
