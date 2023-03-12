<?php

namespace App\Http\Controllers\Admins\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Models\Produtos;
use App\Service\Usuarios\Funcoes\GerenteRegionalUsuariosService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GestaoMetasController extends Controller
{
    public function index()
    {
        $gerentes = (new GerenteRegionalUsuariosService())->getUsers();
        $vendedores = (new VendedoresUsuariosService())->getUsers();

        return Inertia::render('Admin/GestaoMetas/Geral/Index',
            compact('vendedores', 'gerentes'));
    }

    public function filtrar(Request $request)
    {
        $meta = (new MetaVendas())->metas($request->periodo);
        $vendasComparar = (new Produtos())
            ->vendasMensalGeral($request->ano_analise, $request->gerente, $request->vendedor,);
        $vendasAnalisar = (new Produtos())
            ->vendasMensalGeral($request->ano_comparar, $request->gerente, $request->vendedor);

        $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior($request->gerente);

        return [
            'meta' => $meta,
            'vendas_comparar' => $vendasComparar,
            'vendas_analisar' => $vendasAnalisar,
            'vendedores' => $vendedores
        ];
    }
}
