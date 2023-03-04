<?php

namespace App\Http\Controllers\Admins\Usuarios;

use App\Http\Controllers\Controller;
use App\Service\Usuarios\Funcoes\AdminUsuariosService;
use App\src\Usuarios\Funcoes\AdminsUsuario;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $usuarios = (new AdminUsuariosService())->getUsers();

        return Inertia::render('Admin/Usuarios/Admins/Index', compact('usuarios'));
    }

    public function create()
    {
        return Inertia::render('Admin/Usuarios/Admins/Create');
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new AdminsUsuario());

        return redirect()->route('admin.usuarios.admins.index');
    }

    public function edit($id)
    {
        $dados = (new AdminUsuariosService())->getUser($id);

        return Inertia::render('Admin/Usuarios/Admins/Edit',
            compact('dados'));
    }

    public function show($id)
    {
        $dados = (new AdminUsuariosService())->getUser($id);

        return Inertia::render('Admin/Usuarios/Admins/Show', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Usuarios())->atualizar($id, $request, new AdminsUsuario());

        return redirect()->route('admin.usuarios.admins.show', $id);
    }
}
