<?php

namespace App\Http\Controllers\Gerente\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedoresController extends Controller
{
    public function index()
    {
        $usuarios = (new VendedoresUsuariosService())->getVendedoresPeloSuperior(id_usuario_atual());

        return Inertia::render('Gerente/GestaoMetas/Vendedores/Index',
            compact('usuarios'));
    }

    public function edit($id)
    {
        $dados = (new VendedoresUsuariosService())->getUser($id);

        return Inertia::render('Gerente/GestaoMetas/Vendedores/Edit',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new MetaVendas())->atualizar($id, $request->meta);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->route('gerente.gestao-metas.vendedores.index');
    }
}
