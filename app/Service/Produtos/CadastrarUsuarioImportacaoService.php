<?php

namespace App\Service\Produtos;

use App\Models\User;

class CadastrarUsuarioImportacaoService
{
    public function cadastrar($codigo, $nome, $funcao)
    {
        (new User())->cadastrarUsuarioImportacao($codigo, $nome, $funcao);
    }
}
