<?php

namespace App\Http\Controllers\Admins\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Service\Usuarios\Funcoes\GerenteRegionalUsuariosService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedoresController extends Controller
{
    public function index()
    {
        $usuarios = (new VendedoresUsuariosService())->getUsers();

        return Inertia::render('Admin/GestaoMetas/Vendedores/Index',
            compact('usuarios'));
    }

    public function edit($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);

        return Inertia::render('Admin/GestaoMetas/Vendedores/Edit',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new MetaVendas())->atualizar($id, $request->meta_semestre_1, $request->meta_semestre_2);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->route('admin.gestao-metas.vendedores.index');
    }
}
