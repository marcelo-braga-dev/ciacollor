<?php

namespace App\Service\Analises;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProdutosService
{
    private function filtroPeriodo($query, $ano, $mes)
    {
        $ano ? $query->whereYear('data_cadastro', $ano) : null;
        $mes ? $query->whereMonth('data_cadastro', $mes) : null;
    }

    private function filtroUsuario($query, $vendedor, $cliente, $gerente)
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
                'cliente', 'produto',
                'vendedor',
                'gerente_regional',
                DB::raw('AVG(prazo_medio) as prazo, SUM(valor_total) as valor')
            )
            ->groupBy('cod_produto');
        $this->filtroPeriodo($query, $ano, $mes);
        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);
        $clientes = $query->orderByDesc('valor')
            ->limit(5)
            ->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'produto' => $dados->produto,
                    'cliente' => $dados->cliente,
                    'valor' => $dados->valor,
                    'prazo' => $dados->prazo,
                    'gerente' => $nomes[$dados->gerente_regional]['nome'],
                    'vendedor' => $nomes[$dados->vendedor]['nome'],
                ];
            });

        $valores = (new Produtos())->newQuery()
            ->select(DB::raw('SUM(valor_total) as total_geral'))->first();
        $total = 0;
        foreach ($clientes as $cliente) {
            $total += $cliente['valor'];
        }

        return [
            'tabela' => $clientes,
            'total' => $total,
            'total_geral' => $valores['total_geral']
        ];
    }
}
