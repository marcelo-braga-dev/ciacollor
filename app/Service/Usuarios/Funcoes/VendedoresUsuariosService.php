<?php

namespace App\Service\Usuarios\Funcoes;

use App\Models\User;

class VendedoresUsuariosService extends FuncoesService
{
    public function getUsers(): array
    {
        $users = (new User())->getVendedores();

        return $this->dados($users);
    }

    public function getNomes()
    {
        // TODO: Implement getNomes() method.
    }

    public function getUser(int $id): array
    {
        $users = (new User())->getUser($id);

        return $this->dado($users);
    }
}
