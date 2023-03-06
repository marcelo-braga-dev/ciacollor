<?php

namespace App\Service\Produtos;

use App\Models\Produtos;
use App\Models\User;

class ClienteFaturamentoService
{
    private $totalFaturamento;

    public function __construct()
    {
        $this->totalFaturamento = 0;
    }

    public function faturamentoCliente($request, $gerenteAtual = null)
    {
        $items = $this->getVendedores($gerenteAtual, $request);

        $dados = [];

        foreach ($items as $item) {
            $faturamento = $this->getFaturamentos($item['id'], $request, $gerenteAtual, $item['nome']);
            $dados = $this->getDados($item['id'], $faturamento, $dados, $item['nome']);
        }



        return $this->dadosCompremenares($dados);
    }

    public function where($ano, $nome, $campo, $request, $gerenteAtual, $querySun)
    {
        $ano ? $querySun->whereYear('data_cadastro', $ano) : '';
        $gerenteAtual ? $querySun->where('gerente_regional', $gerenteAtual) : '';
        $request->mes ? $querySun->whereMonth('data_cadastro', $request->mes) : '';
    }

    private function buscaValor($ano, $nome, $campo, $request, $gerenteAtual, $querySun)
    {

        $this->where($ano, $nome, $campo, $request, $gerenteAtual, $querySun, $campo);

        return $querySun->where('cliente', $nome)->sum($campo);
    }

    public function filtro(mixed $gerenteAtual, $request, $query): void
    {
        $gerente = $gerenteAtual ?? $request->gerente;
        $vendedor = $request->vendedor;
        $cliente = $request->cliente;
        $where = [];
        if ($gerente) $where[] = ['gerente_regional', $gerente];
        if ($vendedor) $where[] = ['vendedor', $vendedor];
        if ($cliente) $where[] = ['cliente', $cliente];
        count($where) ? $query->where($where) : '';
    }

    public function getFaturamentos($id, $request, $gerenteAtual, $nome): array
    {
        $querySun = (new Produtos())->newQuery();
        $faturamento['comparar']['faturamento'][$id] =
            $this->buscaValor($request->ano_comparar, $nome, 'valor_total', $request, $gerenteAtual, $querySun);

        $faturamento['comparar']['litros'][$id] =
            $this->buscaValor($request->ano_comparar, $nome, 'litros', $request, $gerenteAtual, $querySun);

        $faturamento['analisar']['faturamento'][$id] =
            $this->buscaValor($request->ano_analizar, $nome, 'valor_total', $request, $gerenteAtual, $querySun);
        $faturamento['analisar']['litros'][$id] =
            $this->buscaValor($request->ano_analizar, $nome, 'litros', $request, $gerenteAtual, $querySun);
        return $faturamento;
    }

    public function getDados($id, array $faturamento, array $dados, $nome): array
    {
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
            'vendedor' => $nome,
        ];
        return $dados;
    }

    public function getVendedores(mixed $gerenteAtual, $request)
    {
        $query = (new Produtos())->newQuery()->distinct();

        $this->filtro($gerenteAtual, $request, $query);

        $this->totalFaturamento = $query->get('cliente');

        // coleta vendedores com produtos
        return $query->limit(20)->get('cliente')->transform(function ($e) {
            return ['id' => md5($e->cliente), 'nome' => $e->cliente];
        });
    }

    public function dadosCompremenares(array $dados): array
    {
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
