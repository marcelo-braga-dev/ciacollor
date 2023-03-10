<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable = [
        'doc',
        'gerente_regional',
        'vendedor',
        'cliente',
        'cod_produto',
        'produto',
        'litros',
        'litros_unid',
        'kg',
        'qtd',
        'cod_grupo',
        'grupo',
        'data_cadastro',
        'valor_sugerido',
        'desconto',
        'valor_total',
        'custo',
        'imposto',
        'comissao',
        'frete',
        'prazo_medio'
    ];

    public function create($item)
    {
        DB::beginTransaction();
        try {
            $this->newQuery()
                ->create([
                    'doc' => $item['produto']['doc'],
                    'gerente_regional' => $item['usuarios']['gerente_regional'],
                    'vendedor' => $item['usuarios']['vendedor'],
                    'cliente' => $item['usuarios']['cliente'],
                    'cod_produto' => $item['produto']['cod_produto'],
                    'produto' => $item['produto']['produto'],
                    'litros' => $item['produto']['litros'],
                    'litros_unid' => $item['produto']['litros_unid'],
                    'kg' => $item['produto']['kg'],
                    'qtd' => $item['produto']['qtd'],
                    'cod_grupo' => $item['grupo']['cod_grupo'],
                    'grupo' => $item['grupo']['grupo'],
                    'data_cadastro' => $item['produto']['data_cadastro'],
                    'prazo_medio' => $item['produto']['prazo_medio'],

                    'valor_sugerido' => $item['valores']['sugerido'],
                    'desconto' => $item['valores']['desconto'],
                    'valor_total' => $item['valores']['total'],
                    'custo' => $item['valores']['custo'],
                    'imposto' => $item['valores']['imposto'],
                    'comissao' => $item['valores']['comissao'],
                    'frete' => $item['valores']['frete'],
                ]);
        } catch (QueryException $exception) {
            DB::rollBack();
            print_pre($item, $exception->getMessage());
        }
        DB::commit();
    }

    public function dadosFaturamento($gerente, $vendedor, $cliente)
    {
        $query = $this->newQuery();
        $where = [];

        if ($gerente) $where[] = ['gerente_regional', $gerente];
        if ($vendedor) $where[] = ['vendedor', $vendedor];
        if ($cliente) $where[] = ['cliente', $cliente];

        if (count($where)) $query->where($where);

        return $query->get(['data_cadastro', 'valor_total', 'litros', 'vendedor']);
    }

    public function getClientes()
    {
        return $this->newQuery()
            ->distinct()
            ->get(['cliente']);
    }

    public function vendasMensalGeral($ano, $gerente = null, $vendedor = null)
    {
        $dados = [];
        $dados['total'] = 0;
        for ($i = 1; $i <= 12; $i++) {

            $query = $this->newQuery();
            $ano ? $query->whereYear('data_cadastro', $ano) : '';
            $gerente ? $query->where('gerente_regional', $gerente) : '';
            $vendedor ? $query->where('vendedor', $vendedor) : '';

            $vendas = $query->whereMonth('data_cadastro', $i)
                ->sum('valor_total');

            $dados['total'] += $vendas;

            $dados[$i] = [
                'valor' => $vendas,
                'valor_float' => round($vendas, 2),
            ];
        }
        return $dados;
    }

    public function getClientesUsuario($idUsuario)
    {
        return $this->newQuery()
            ->where('gerente_regional', $idUsuario)
            ->distinct()
            ->get(['cliente']);
    }
}
