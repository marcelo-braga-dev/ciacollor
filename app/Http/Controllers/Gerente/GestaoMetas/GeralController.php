<?php

namespace App\Http\Controllers\Gerente\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Models\Produtos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeralController extends Controller
{
    public function index()
    {
        return Inertia::render('Gerente/GestaoMetas/Geral/Index');
    }

    public function filtrar(Request $request)
    {
        $metaAnual = (new MetaVendas())->metaAnualUsuario();
        $vendasComparar = (new Produtos())
            ->vendasMensalGeral($request->ano_analise, id_usuario_atual());
        $vendasAnalisar = (new Produtos())
            ->vendasMensalGeral($request->ano_comparar, id_usuario_atual());

        return [
            'meta_anual' => $metaAnual,
            'vendas_comparar' => $vendasComparar,
            'vendas_analisar' => $vendasAnalisar,
        ];
    }
}
