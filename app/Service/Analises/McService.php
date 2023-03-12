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

    public function calcular($request, $gerente = null)
    {
        $nomes = (new User())->getNomes();
        $gerenteAtual = $gerente ?? $request->gerente;
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
                DB::raw('
                AVG(prazo_medio) as prazo,
                SUM(valor_total) as valor,
                (SUM(valor_total) - SUM(custo) - SUM(comissao) - SUM(frete)) as mc')
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
                    'mc' => $dados->mc,
                    'mc_taxa' => ''
                ];
            });

        $mediaQuery = (new Produtos())->newQuery()
            ->select(DB::raw('
            AVG(prazo_medio) as media_total,
            SUM(valor_total) as media_valor_total'));

        $this->filtroPeriodo($mediaQuery, $ano, $mes);
        $this->filtroUsuario($mediaQuery, $vendedor, $cliente, $gerenteAtual);
        $media = $mediaQuery->first();

        return [
            'tabela' => $clientes,
            'media' => $media['media_total'] ?? 0,
            'media_valor' => $media['media_valor_total'] ?? 0,
        ];
    }
}
