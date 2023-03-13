<?php

namespace App\Service\Dashboard;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TopVendedoreservice
{
    public function calcular($request)
    {
        $nomes = (new User())->getNomes();

        $gerenteAtual = $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;
        $mes = $request->mes;
        $ano = $request->ano;

        $query = (new Produtos())->newQuery();

        $this->filtroPeriodo($query, $ano, $mes);
        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);

        $valorVendedores = $query->select(
            'vendedor',
            DB::raw('SUM(valor_total) as valor'))
            ->groupBy('vendedor')
            ->orderByDesc('valor')
            ->limit(5)
            ->get()->transform(function ($dados) use ($nomes) {
                return [
                    'nome' => $nomes[$dados->vendedor]['nome'] ?? '',
                    'valor' => $dados->valor
                ];
            });

        $total = (new Produtos())->newQuery()
            ->select(DB::raw('SUM(valor_total) as valor'))
            ->first();

        $valorVendedor = 0;
        foreach ($valorVendedores as $item) {
            $valorVendedor += $item['valor'];
        }

        return [
            'tabela' => $valorVendedores,
            'total_selecionados' => $valorVendedor,
            'total_geral' => $total->valor
        ];
    }

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
}
