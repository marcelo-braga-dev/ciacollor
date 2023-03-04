<?php

namespace App\src\Usuarios\Status;

class AtivoStatusUsuario
{
    private string $status = 'ativo';

    public function getStatus(): string
    {
        return $this->status;
    }
}
