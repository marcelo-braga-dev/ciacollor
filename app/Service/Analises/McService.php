<?php

namespace App\Service\Analises;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class McService
{
    private function filtroPeriodo($query, $ano, $mes)
    {
        $ano ? $query->whereYear('data_cadastro', $ano) : null;
        $mes ? $query->whereMonth('data_cadastro', $mes) : null;
    }

    public function filtroUsuario($query, $vendedor, $cliente, $gerente)
    {
        if ($cliente) return $query->where('cliente', $cliente);
        if ($vendedor) return $query->where('vendedor', $vendedor);
        if ($gerente) return $query->where('gerente_regional', $gerente);
    }

    public function calcular($request)
    {
        $nomes = (new User())->getNomes();
        $gerenteAtual = $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;
        $mes = $request->mes;
        $ano = $request->ano;

        $query = (new Produtos())->newQuery()
            ->select(
                'grupo', 'cod_grupo',
                'cliente',
                'vendedor',
                'gerente_regional',
                DB::raw('AVG(prazo_medio) as prazo, SUM(valor_total) as valor')
            )
            ->groupBy('cod_grupo');

        $this->filtroPeriodo($query, $ano, $mes);
        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);
        $clientes = $query->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'cod' => $dados->cod_grupo,
                    'cliente' => $dados->cliente,
                    'vendedor' => $nomes[$dados->vendedor]['nome'],
                    'grupo' => $dados->grupo,
                    'valor' => $dados->valor,
                    'mc' => '',
                    'mc_taxa' => ''
                ];
            });

        $media = (new Produtos())->newQuery()
            ->select(DB::raw('AVG(prazo_medio) as media'))->first();

        return [
            'tabela' => $clientes,
            'media' => $media['media'] ?? 0
        ];
    }
}
