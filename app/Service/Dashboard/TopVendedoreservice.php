<?php

namespace App\Service\Dashboard;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TopVendedoreservice
{
    public function calcular()
    {
        $nomes = (new User())->getNomes();

        $query = (new Produtos())->newQuery();
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
}
