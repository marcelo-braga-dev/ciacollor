<?php

namespace App\Service\Analises;

use App\Models\Produtos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DescontoMedioService
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
                DB::raw('AVG(desconto) as desconto,
                    SUM(valor_total) as valor_total,
                    SUM(valor_sugerido) as valor_sugerido,
                    AVG(desconto/valor_sugerido) as media')
            )
            ->groupBy('cliente');

        $this->filtroPeriodo($query, $ano, $mes);
        $this->filtroUsuario($query, $vendedor, $cliente, $gerenteAtual);

        $clientes = $query->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'vendedor' => $nomes[$dados->vendedor]['nome'],
                    'cliente' => $dados->cliente,
                    'valor_sugerido' => $dados->valor_sugerido,
                    'valor_desconto' => $dados->desconto,
                    'media' => $dados->media,
                    'valor_total' => 0,
                ];
            });

        $media = (new Produtos())->newQuery()
            ->select(DB::raw('AVG(desconto) as media_desconto'))->first();

        $mediaTotal = [];
        foreach ($clientes as $cliente) {
            $mediaTotal[] = $cliente['media'];
        }
        $mediaTotal = array_sum($mediaTotal) / count($mediaTotal);

        return [
            'tabela' => $clientes,
            'media' => $mediaTotal
        ];
    }
}
