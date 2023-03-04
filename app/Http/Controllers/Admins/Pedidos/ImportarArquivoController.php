<?php

namespace App\Http\Controllers\Admins\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Models\User;
use App\Service\Produtos\DadosImportarProdutosService;
use App\Service\Produtos\ImportarArquivoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImportarArquivoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Produtos/Importar/Index');
    }

    public function store(Request $request)
    {
        $dados = (new ImportarArquivoService())->dados($request);

        $dadosSeparados = (new DadosImportarProdutosService())->executar($dados);
        ini_set('max_execution_time', 6000);
        foreach ($dadosSeparados as $item) {
            (new Produtos())->create($item);
        }

        return redirect()->back();
    }
}
