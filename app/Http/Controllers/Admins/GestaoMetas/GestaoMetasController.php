<?php

namespace App\Http\Controllers\Admins\GestaoMetas;

use App\Http\Controllers\Controller;
use App\Models\MetaVendas;
use App\Models\Produtos;
use App\Service\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GestaoMetasController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/GestaoMetas/Geral/Index');
    }

    public function filtrar(Request $request)
    {
        $metaAnual = (new MetaVendas())->metaAnual();
        $vendasComparar = (new Produtos())->vendasMensalGeral($request->ano_analise);
        $vendasAnalisar = (new Produtos())->vendasMensalGeral($request->ano_comparar);

        return [
            'meta_anual' => $metaAnual,
            'vendas_comparar' => $vendasComparar,
            'vendas_analisar' => $vendasAnalisar,
        ];
    }
}
