<?php

namespace App\Service\Produtos;

use App\Models\Produtos;
use Illuminate\Support\Facades\DB;

class GruposService
{
    private function filtroPeriodo($query, $ano, $mes)
    {
        $ano ? $query->whereYear('data_cadastro', $ano) : '';
        $mes ? $query->whereMonth('data_cadastro', $mes) : '';
    }

    public function filtroUsuario($query, $vendedor, $cliente, $gerente): void
    {
        $where = [];
        if ($gerente) $where[] = ['gerente_regional', $gerente];
        if ($vendedor) $where[] = ['vendedor', $vendedor];
        if ($cliente) $where[] = ['cliente', $cliente];
        count($where) ? $query->where($where) : '';
    }

    public function setQuery($vendedor, $cliente, $gerenteAtual, $anoComparar, $mes)
    {
        $query = (new Produtos())->newQuery()
            ->select(
                'cod_grupo',
                'grupo',
                DB::raw('SUM(valor_total) as valor_total, SUM(litros) as litros')
            );

        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);
        $this->filtroPeriodo($query, $anoComparar, $mes);
        return $query->groupBy('cod_grupo')
            ->orderByDesc('cod_grupo')
            ->get();
    }

    public function faturamento($null, \Illuminate\Http\Request $request)
    {
        $gerenteAtual = $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;

        $mes = $request->mes;
        $anoComparar = $request->ano_comparar;
        $anoAnalisar = $request->ano_analizar;

        $dados = [];
        $dados['comparar'] = $this->setQuery($vendedor, $cliente, $gerenteAtual, $anoComparar, $mes);
        $dados['analisar'] = $this->setQuery($vendedor, $cliente, $gerenteAtual, $anoAnalisar, $mes);

        return $this->serializar($dados);
    }

    private function serializar($dados)
    {
        $grupos = (new Produtos())->newQuery()->distinct()->get('cod_grupo');

        $grupo = [];
        foreach ($grupos as $item) {
            $grupo['comparar'][$item->cod_grupo] = [];
            $grupo['analisar'][$item->cod_grupo] = [];
        }

        $res = [];
        foreach ($dados['comparar'] as $item) {
            $grupo['comparar'][$item['cod_grupo']] = $item;
        }
        foreach ($dados['analisar'] as $item) {
            $grupo['analisar'][$item['cod_grupo']] = $item;
        }

        $res2 = [];
        foreach ($grupo['comparar'] as $item) {
            $res2['comparar'][] = $item;
        }
        foreach ($grupo['analisar'] as $item) {
            $res2['analisar'][] = $item;
        }

        $res3 = [];
        $grupo = null;

        $totalFaturamentoComparar = 0;
        $totalLitrosComparar = 0;
        $totalFaturamentoAnalizar = 0;
        $totalLitrosAnalizar = 0;


        foreach ($res2['comparar'] as $index => $item) {
            $grupo[$index] = $item['grupo'] ?? null;
            $res3['tabela'][$index]['grupo'] = $item['grupo'] ?? null;
            $res3['tabela'][$index]['comparar'] = $item;

            $totalFaturamentoComparar += $item['valor_total'] ?? 0;
            $totalLitrosComparar += $item['litros'] ?? 0;
        }
        foreach ($res2['analisar'] as $index => $item) {

            $res3['tabela'][$index]['grupo'] = $grupo[$index] ?? ($item['grupo'] ?? null);
            $res3['tabela'][$index]['analisar'] = $item;

            $totalFaturamentoAnalizar += $item['valor_total'] ?? 0;
            $totalLitrosAnalizar += $item['litros'] ?? 0;
        }

        $razaoComparar = $totalLitrosComparar ? $totalFaturamentoComparar / $totalLitrosComparar : 0;
        $razaoAnalisar = $totalLitrosAnalizar ? $totalFaturamentoAnalizar / $totalLitrosAnalizar : 0;

        $res3['totais'] = [
            'comparar_faturado' => $totalFaturamentoComparar,
            'comparar_litros' => $totalLitrosComparar,
            'analisar_faturado' => $totalFaturamentoAnalizar,
            'analisar_litros' => $totalLitrosAnalizar,
            'comparar_ticket' => $razaoComparar,
            'analisar_ticket' => $razaoAnalisar,
            'taxa_faturado' => $totalFaturamentoComparar ? (($totalFaturamentoAnalizar - $totalFaturamentoComparar) / $totalFaturamentoComparar) : 0,
            'taxa_litros' => $totalLitrosComparar ? round((($totalLitrosAnalizar - $totalLitrosComparar) / $totalLitrosComparar), 4) : 0,
            'taxa_ticket' => $razaoComparar ? round(((($razaoAnalisar) - ($razaoComparar)) / ($razaoComparar)), 4) : 0,
        ];

        return $res3;
    }

    public function getGrupos()
    {
        return (new Produtos())->newQuery()
            ->distinct()
            ->get(['grupo', 'cod_grupo'])
            ->transform(function ($dados) {
                return [
                    'cod' => $dados->cod_grupo,
                    'nome' => $dados->grupo,
                ];
            });
    }
}
