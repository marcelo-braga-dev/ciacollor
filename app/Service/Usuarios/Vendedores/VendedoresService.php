<?php

namespace App\Service\Usuarios\Vendedores;

use App\Models\Produtos;
use App\Models\User;

class VendedoresService
{
    public function produtos()
    {
        $users = (new User())->getVendedores();

        $produtos = (new Produtos())->getVendedores();
    }
}
