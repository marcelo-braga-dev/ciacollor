<?php

namespace App\Http\Controllers\Admins\Dashboard;

use App\Http\Controllers\Controller;
use App\Service\Analises\PrazoMedioService;
use App\Service\Analises\ProdutosService;
use App\Service\Dashboard\TopGerentesService;
use App\Service\Dashboard\TopVendedoreservice;
use App\Service\Faturamento\VendedoresFaturamentoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $produtos = (new ProdutosService())->calcular($request);
        $gerentes = (new TopGerentesService())->calcular($request);
        $vendedores = (new TopVendedoreservice())->calcular($request);

//        $vendedores = (new VendedoresFaturamentoService())->calcular();

        return Inertia::render('Admin/Dashboard/Index',
            compact('produtos', 'gerentes', 'vendedores'));
    }
}
