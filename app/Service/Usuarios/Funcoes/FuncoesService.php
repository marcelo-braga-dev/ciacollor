<?php

namespace App\Service\Usuarios\Funcoes;

use App\Models\MetaVendas;
use App\Models\User;

abstract class FuncoesService implements FuncoesServiceInterface
{
    private $usuario;
    private $metas;

    public function __construct()
    {
        $this->usuario = (new User())->getNomes();
        $this->metas = (new MetaVendas())->getMetas();
    }

    protected function dados($items): array
    {
        $dados = [];
        foreach ($items as $item) {
            $dados[] = $this->dadosCompleto($item);
        }
        return $dados;
    }

    protected function dado($item)
    {
        return $this->dadosCompleto($item);
    }

    protected function nomes($items): array
    {
        $dados = [];
        foreach ($items as $item) {
            $dados[] = [
                'id' => $item->id,
                'codigo' => $item->codigo,
                'nome' => $item->name,
            ];
        }
        return $dados;
    }

    private function dadosCompleto($item)
    {
        return [
            'id' => $item->id,
            'codigo' => $item->codigo,
            'nome' => $item->name,
            'email' => $item->email,
            'funcao' => $item->funcao,
            'superior_id' => $item->superior,
            'superior_nome' => $this->usuario[$item->superior]['nome'] ?? '',
            'data_cadastro' => date('d/m/y H:i', strtotime($item->created_at)),
            'meta_anual' => convert_float_money($this->metas[$item->id] ?? '')
        ];
    }
}
