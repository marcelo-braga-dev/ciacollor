<?php

namespace App\Service\Dashboard;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TopGerentesService
{
    public function calcular()
    {
        $nomes = (new User())->getNomes();

        $query = (new Produtos())->newQuery();
        $valorGerentes = $query->select(
            'gerente_regional',
            DB::raw('SUM(valor_total) as valor'))
            ->groupBy('gerente_regional')
            ->orderByDesc('valor')
            ->limit(5)
            ->get()->transform(function ($dados) use ($nomes) {
                return [
                    'nome' => $nomes[$dados->gerente_regional]['nome'] ?? '',
                    'valor' => $dados->valor
                ];
            });

        $total = (new Produtos())->newQuery()
            ->select(DB::raw('SUM(valor_total) as valor'))
            ->first();

        $totalGerentes = 0;
        foreach ($valorGerentes as $item) {
            $totalGerentes += $item['valor'];
        }

        return [
            'tabela' => $valorGerentes,
            'total_selecionados' => $totalGerentes,
            'total_geral' => $total->valor
        ];
    }
}
