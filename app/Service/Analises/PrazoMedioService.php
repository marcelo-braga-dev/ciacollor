<?php

namespace App\Service\Analises;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PrazoMedioService
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
                'cliente',
                'vendedor',
                'gerente_regional',
                DB::raw('AVG(prazo_medio) as prazo, SUM(valor_total) as valor')
            )
            ->groupBy('cliente');
        $this->filtroPeriodo($query, $ano, $mes);
        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);
        $clientes = $query->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'cliente' => $dados->cliente,
                    'valor' => $dados->valor,
                    'prazo' => $dados->prazo,
                    'gerente' => $nomes[$dados->gerente_regional]['nome'],
                    'vendedor' => $nomes[$dados->vendedor]['nome'],
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
