<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaVendas extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'semestre_1',
        'semestre_2',
    ];

    public function atualizar($id, $semestre1, $semestre2)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $id], [
                    'semestre_1' => convert_money_float($semestre1),
                    'semestre_2' => convert_money_float($semestre2)
                ]
            );
    }

    public function getMetas()
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->users_id]['semestre_1'] = $item->semestre_1;
            $dados[$item->users_id]['semestre_2'] = $item->semestre_2;
        }
        return $dados;
    }

    public function metas($periodo = null)
    {
        if ($periodo == 1) return $this->newQuery()->sum('semestre_1');
        if ($periodo == 2) return $this->newQuery()->sum('semestre_2');
        return
            $this->newQuery()->sum('semestre_1') +
            $this->newQuery()->sum('semestre_2');
    }

    public function metaAnualGerente()
    {
        $vendedores = (new User())->getUserPeloSuperior(id_usuario_atual());

        $query = (new MetaVendas())->newQuery();
        foreach ($vendedores as $vendedor) {
            $query->orWhere('users_id', $vendedor['id']);
        }

        return $vendedores->count() ? $query->sum('anual') : 0;
    }
}
