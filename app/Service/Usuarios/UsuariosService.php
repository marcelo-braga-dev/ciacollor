<?php

namespace App\Service\Usuarios;

use App\Models\User;
use App\Service\Usuarios\Funcoes\AdminUsuariosService;
use App\src\Usuarios\Funcoes\AdminsUsuario;
use App\src\Usuarios\Funcoes\GerenteRegionalUsuario;
use App\src\Usuarios\Funcoes\VendedorUsuario;

class UsuariosService
{

    public function todosUsuarios()
    {
        $users = (new User())->newQuery()->get(['id', 'codigo', 'name', 'funcao']);

        $dados[(new AdminsUsuario())->getFuncao()] = [];
        $dados[(new GerenteRegionalUsuario())->getFuncao()] = [];
        $dados[(new VendedorUsuario())->getFuncao()] = [];

        foreach ($users as $user) {
            $dados[$user->funcao][] = [
                'id' => $user->id,
                'nome' => $user->codigo .' - '.$user->name,
            ];
        }
        return $dados;
    }

    public function getVendedoresDoGerente($idGerente)
    {
        $users = (new User())->newQuery()
            ->where('superior', $idGerente)
            ->get(['id', 'codigo', 'name', 'funcao']);

        $dados[(new VendedorUsuario())->getFuncao()] = [];

        foreach ($users as $user) {
            $dados[$user->funcao][] = [
                'id' => $user->id,
                'nome' => $user->codigo .' - '.$user->name,
            ];
        }
        return $dados;
    }
}
