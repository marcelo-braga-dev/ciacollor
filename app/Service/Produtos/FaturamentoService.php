<?php

namespace App\Service\Produtos;

use App\Models\Produtos;
use App\Models\User;
use App\Service\Usuarios\UsuariosService;

class FaturamentoService
{
    private $nome;
    private $vendedores;

    public function __construct()
    {
        $this->nome = (new User())->getNomes();
        $this->vendedores = [];
    }

    public function faturamento($request, $gerenteAtual = null)
    {
        $query = (new Produtos())->newQuery()->distinct();

        $gerente = $gerenteAtual ?? $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;
        $where = [];
        if ($gerente) $where[] = ['gerente_regional', $gerente];
        if ($vendedor) $where[] = ['vendedor', $vendedor];
        if ($cliente) $where[] = ['cliente', $cliente];

        count($where) ? $query->where($where) : '';

        $this->vendedores = $query->get('vendedor')->transform(function ($e) {
            return ['id' => $e->vendedor];
        });

        $anoComparar = $request->ano_comparar;
        $anoAnalisar = $request->ano_analizar;
        $mes = $request->mes;

        $dados = [];
        function getDados($ano, $id, $campo, $request, $gerenteAtual)
        {
            $query = (new Produtos())->newQuery();

            $ano ? $query->whereYear('data_cadastro', $ano) : '';
            $gerenteAtual ? $query->where('gerente_regional', $gerenteAtual) : '';
            $request->mes ? $query->whereMonth('data_cadastro', $request->mes) : '';


            return $query->where('vendedor', $id)->sum($campo);
        }

        foreach ($this->vendedores as $item) {

            $faturamento['comparar']['faturamento'][$item['id']] =
                getDados($anoComparar, $item['id'], 'valor_total', $request, $gerenteAtual);
            $faturamento['comparar']['litros'][$item['id']] =
                getDados($anoComparar, $item['id'], 'litros', $request, $gerenteAtual);

            $faturamento['analisar']['faturamento'][$item['id']] =
                getDados($anoAnalisar, $item['id'], 'valor_total', $request, $gerenteAtual);
            $faturamento['analisar']['litros'][$item['id']] =
                getDados($anoAnalisar, $item['id'], 'litros', $request, $gerenteAtual);

            $id = $item['id'];
            $dados[$id] = [
                'comparar' => [
                    'faturamento' => convert_float_money($faturamento['comparar']['faturamento'][$id]),
                    'faturamento_float' => $faturamento['comparar']['faturamento'][$id],
                    'litros' => $faturamento['comparar']['litros'][$id]

                ],
                'analizar' => [
                    'faturamento' => convert_float_money($faturamento['analisar']['faturamento'][$id]),
                    'faturamento_float' => $faturamento['analisar']['faturamento'][$id],
                    'litros' => $faturamento['analisar']['litros'][$id],
                ],
                'vendedor' => $this->nome[$id]['codigo'] . '-' . $this->nome[$id]['nome'],
                'id_vendedor' => $id,
            ];
        }

        $res['tabela'] = [];
        $totalFaturamentoComparar = 0;
        $totalLitrosComparar = 0;
        $totalFaturamentoAnalizar = 0;
        $totalLitrosAnalizar = 0;
        foreach ($dados as $item) {
            $res['tabela'][] = $item;
            $totalFaturamentoComparar += $item['comparar']['faturamento_float'];
            $totalLitrosComparar += $item['comparar']['litros'];
            $totalFaturamentoAnalizar += $item['analizar']['faturamento_float'];
            $totalLitrosAnalizar += $item['analizar']['litros'];
        }

        $razaoComparar = $totalLitrosComparar ? $totalFaturamentoComparar / $totalLitrosComparar : 0;
        $razaoAnalisar = $totalLitrosAnalizar ? $totalFaturamentoAnalizar / $totalLitrosAnalizar : 0;

        $res['totais'] = [
            'comparar_faturado' => convert_float_money($totalFaturamentoComparar),
            'comparar_litros' => $totalLitrosComparar,
            'analisar_faturado' => convert_float_money($totalFaturamentoAnalizar),
            'analisar_litros' => $totalLitrosAnalizar,
            'comparar_ticket' => convert_float_money($razaoComparar),
            'analisar_ticket' => convert_float_money($razaoAnalisar),
            'taxa_faturado' => $totalFaturamentoComparar ? round((($totalFaturamentoAnalizar - $totalFaturamentoComparar) / $totalFaturamentoComparar), 4) : 0,
            'taxa_litros' => $totalLitrosComparar ? round((($totalLitrosAnalizar - $totalLitrosComparar) / $totalLitrosComparar), 4) : 0,
            'taxa_ticket' => $razaoComparar ? round(((($razaoAnalisar) - ($razaoComparar)) / ($razaoComparar)), 4) : 0,
        ];

        return $res;
    }
}
