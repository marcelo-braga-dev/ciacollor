<?php

namespace App\src\Usuarios;

use App\Models\User;
use App\src\Usuarios\Funcoes\FuncoesUsuarios;
use App\src\Usuarios\Funcoes\VendedorUsuario;
use Illuminate\Support\Facades\Hash;

class Usuarios
{
    public function cadastrar($request, FuncoesUsuarios $tiposUsuarios)
    {
        $tiposUsuarios->cadastrarUsuario($request);
    }

    public function alterarSenha($idUsuario, $request, $verificarAtual = false)
    {
        $usuario = (new User())->find($idUsuario);

        $validate = [
            'nova_senha' => 'required|string|min:4',
        ];

        if ($verificarAtual) {
            $validate = array_merge($validate, ['senha_atual' => 'required']);
            if (!(Hash::check($request->get('senha_atual'), $usuario->password))) { //$request->get('senha_atual')
                throw new \DomainException('Senha atual inválida!');
            }
        }

        if ($request->get('nova_senha') !== $request->get('confirmar_senha')) {
            throw new \DomainException('Nova senha e Confirmar Senha não coincidem!');
        }

        $request->validate(
            $validate,
            ['nova_senha.min' => 'A senha deve ter no mínimo 4 dígitos']
        );

        $usuario->password = Hash::make($request->get('nova_senha'));
        $usuario->save();
    }

    public function atualizar($id, $request, FuncoesUsuarios $usuario)
    {
        $usuario->atualizarDados($id, $request);
    }
}
