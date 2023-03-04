<?php

namespace App\Service\Usuarios\Funcoes;

interface FuncoesServiceInterface
{
    public function getUsers(): array;
    public function getUser(int $id): array;
    public function getNomes();
}
