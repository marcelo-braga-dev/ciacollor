<?php

namespace App\Service\Usuarios\Funcoes;

use App\Models\User;

class AdminUsuariosService extends FuncoesService
{
    public function getUsers(): array
    {
        $users = (new User())->getAdmins();

        return $this->dados($users);
    }

    public function getNomes()
    {
        $users = (new User())->getGerentesNomes();

        return $this->nomes($users);
    }

    public function getUser(int $id): array
    {
        $users = (new User())->getUser($id);

        return $this->dado($users);
    }
}
