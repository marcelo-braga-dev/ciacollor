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
        $this->vendedores = (new UsuariosService())->todosUsuarios()['vendedor'];
    }

    public function faturamento($request)
    {
        $gerente = $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;

        $analisar = (new Produtos())->dadosFaturamento($gerente, $vendedor, $cliente);

        return $this->dados($analisar, $request);
    }

    private function dados($analisar, $request)
    {
        $anoComparar = $request->ano_comparar;
        $anoAnalisar = $request->ano_analizar;
        $mes = $request->mes;

        $dados = [];

        function getAno($dataProduto, $verificar, $mes)
        {
            if (!$verificar) return true;

            $anoProduto = date('Y', strtotime($dataProduto));
            $mesProduto = date('m', strtotime($dataProduto));

            if ($mes) return ($mesProduto == $mes) && $anoProduto == $verificar;

            return $anoProduto == $verificar;
        }

        // calcula faturamento e litros
        $faturamento['comparar']['faturamento'] = [];
        $faturamento['comparar']['litros'] = [];
        $faturamento['analisar']['faturamento'] = [];
        $faturamento['analisar']['litros'] = [];

        // inicia os indices
        foreach ($analisar as $item) {
            $faturamento['comparar']['faturamento'][$item->vendedor] = 0;
            $faturamento['comparar']['litros'][$item->vendedor] = 0;
            $faturamento['analisar']['faturamento'][$item->vendedor] = 0;
            $faturamento['analisar']['litros'][$item->vendedor] = 0;
        }

        // camparar
        foreach ($analisar as $item) {
            if (getAno($item->data_cadastro, $anoComparar, $mes)) {
                $faturamento['comparar']['faturamento'][$item->vendedor] += $item->valor_total;
                $faturamento['comparar']['litros'][$item->vendedor] += $item->litros;
            }
        }

        // analisar
        foreach ($analisar as $item) {
            if (getAno($item->data_cadastro, $anoAnalisar, $mes)) {
                $faturamento['analisar']['faturamento'][$item->vendedor] += $item->valor_total;
                $faturamento['analisar']['litros'][$item->vendedor] += $item->litros;
            }
        }

        //separa por vendedor
        foreach ($analisar as $item) {
            $dados[$item->vendedor] = [
                'comparar' => [
                    'faturamento' => convert_float_money($faturamento['comparar']['faturamento'][$item->vendedor]),
                    'faturamento_float' => $faturamento['comparar']['faturamento'][$item->vendedor],
                    'litros' => $faturamento['comparar']['litros'][$item->vendedor]

                ],
                'analizar' => [
                    'faturamento' => convert_float_money($faturamento['analisar']['faturamento'][$item->vendedor]),
                    'faturamento_float' => $faturamento['analisar']['faturamento'][$item->vendedor],
                    'litros' => $faturamento['analisar']['litros'][$item->vendedor],
                ],
                'vendedor' => $this->nome[$item->vendedor]['codigo'] . '-' . $this->nome[$item->vendedor]['nome'],
                'id_vendedor' => $item->vendedor,

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
            'taxa_faturado' => $totalFaturamentoComparar ? round((($totalFaturamentoAnalizar - $totalFaturamentoComparar) / $totalFaturamentoComparar), 4): 0,
            'taxa_litros' => $totalLitrosComparar ? round((($totalLitrosAnalizar - $totalLitrosComparar) / $totalLitrosComparar), 4) : 0,
            'taxa_ticket' => $razaoComparar ? round(((($razaoAnalisar) - ($razaoComparar)) / ($razaoComparar)), 4): 0,
        ];

        return $res;
    }
}
