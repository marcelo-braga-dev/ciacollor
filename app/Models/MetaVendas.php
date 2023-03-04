<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaVendas extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'anual'
    ];

    public function create($id, $meta)
    {
        $this->newQuery()
            ->create([
                'users_id' => $id,
                'anual' => $meta
            ]);
    }

    public function atualizar($id, $meta)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $id],
                ['anual' => convert_money_float($meta)]
            );
    }

    public function getMetas()
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->users_id] = $item->anual;
        }
        return $dados;
    }

    public function metaAnual()
    {
        return $this->newQuery()->sum('anual');
    }
}
