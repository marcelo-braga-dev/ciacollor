<?php

namespace App\Http\Controllers\Gerente\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Models\Produtos;
use App\Models\User;
use App\Service\Usuarios\Funcoes\GerenteRegionalUsuariosService;
use App\Service\Usuarios\Funcoes\VendedoresUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeralController extends Controller
{
    public function index()
    {
        $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior(id_usuario_atual());

        return Inertia::render('Gerente/GestaoMetas/Geral/Index', compact('vendedores'));
    }

    public function filtrar(Request $request)
    {
        $gerente = id_usuario_atual();
        $meta = (new MetaVendas())->metas($request->periodo);
        $vendasComparar = (new Produtos())
            ->vendasMensalGeral($request->ano_analise, $gerente, $request->vendedor,);
        $vendasAnalisar = (new Produtos())
            ->vendasMensalGeral($request->ano_comparar, $gerente, $request->vendedor);

        $vendedores = (new VendedoresUsuariosService())->getVendedoresPeloSuperior($gerente);

        return [
            'meta' => $meta,
            'vendas_comparar' => $vendasComparar,
            'vendas_analisar' => $vendasAnalisar,
            'vendedores' => $vendedores
        ];
    }
}
