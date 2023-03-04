<?php

namespace App\src\Usuarios\Funcoes;

interface FuncoesUsuarios
{
    function getFuncao(): string;

    function cadastrarUsuario($request);

    function atualizarDados($id, $request);
}
