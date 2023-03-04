<?php

namespace App\Service\Produtos;

use App\Models\User;
use App\src\Usuarios\Funcoes\GerenteRegionalUsuario;
use App\src\Usuarios\Funcoes\VendedorUsuario;

class DadosImportarProdutosService
{
    private array $codigos;
    private string $funcaoGerente;
    private string $funcaoVendedor;

    public function __construct()
    {
        $this->codigos = (new User())->getIdsPelosCodigos();
        $this->funcaoGerente = (new GerenteRegionalUsuario())->getFuncao();
        $this->funcaoVendedor = (new VendedorUsuario())->getFuncao();

    }

    public function executar($dados)
    {
        foreach ($dados as $dado) {
            try {
                $items[] = $this->dados($dado);
            } catch (\ErrorException $exception) {
                print_pre($exception->getMessage());
            }
        }
        return $items;
    }

    private function dados($items)
    {
        return [
            'produto' => [
                'data_cadastro' => $this->converterData($items[0]),
                'doc' => $items[1],
                'prazo_medio' => $items[2],
                'cod_produto' => $items[8],
                'produto' => utf8_encode($items[9]),

                'litros' => convert_money_float(trim($this->getLitros($items[10])['litros'])),
                'litros_unid' => $this->getLitros($items[10])['unid'],
                'kg' => convert_money_float($items[11]),
                'qtd' => convert_money_float($items[12]),
            ],
            'usuarios' => [
                'gerente_regional' => $this->idUsuario($items[3], $this->funcaoGerente),
                'vendedor' => $this->idUsuario($items[4], $this->funcaoVendedor),
                'cliente' => utf8_encode($items[5]),
            ],
            'grupo' => [
                'cod_grupo' => $items[6],
                'grupo' => utf8_encode($items[7]),
            ],
            'valores' => [
                'sugerido' => convert_money_float($items[13]),
                'desconto' => convert_money_float($items[14]),
                'total' => convert_money_float($items[15]),
                'custo' => convert_money_float($items[16]),
                'imposto' => convert_money_float($items[17]),
                'comissao' => convert_money_float($items[18]),
                'frete' => convert_money_float($items[19]),
            ]
        ];
    }

    private function idUsuario($user, string $funcao)
    {
        $explode = explode('-', $user);
        $codigo = $explode[0];

        try {
            return $this->codigos[$codigo];
        } catch (\ErrorException) {
            (new CadastrarUsuarioImportacaoService())->cadastrar($codigo, $explode[1], $funcao);
            $this->codigos = (new User())->getIdsPelosCodigos();
            return $this->codigos[$codigo];
//            throw new \DomainException('Usuário ' . $user . ' não encontrado.');
        }
    }

    private function getLitros($dado)
    {
        $explode = explode(' ', $dado);

        return [
            'litros' => $explode[0] ?? 0,
            'unid' => $explode[1] ?? null,
        ];
    }

    private function converterData($data)
    {
        // Datas
        $dataCadastro = null;
        $explode = explode('/', $data);
        if ($explode[2] ?? null) $dataCadastro = $explode[2] . '-' . $explode[1] . '-' . $explode[0] . ' 00:00';
        return $dataCadastro;
    }
}
