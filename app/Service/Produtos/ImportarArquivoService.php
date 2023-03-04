<?php

namespace App\Service\Produtos;

use App\Models\Produtos;

class ImportarArquivoService
{
    public function dados($request)
    {
        if ($request->hasFile('arquivo')) {
            $file = $request->file('arquivo');
            if ($file->isValid()) {
                $dados = $this->armazenaArquivo($file);
                return $this->linhas($dados);
            }
        }
        throw new \DomainException('Arquivo Não Encontrado!');
    }

    private function linhas($dados)
    {
        $file = fopen($dados, 'r');

        $linhas = [];
        $i = 0;
        while (($data = fgetcsv($file, null, ';')) !== FALSE) {
            $i++;
            if ($i > 1) $linhas[] = $data;
        }
        fclose($file);

        return $linhas;
    }

    private function armazenaArquivo($file)
    {
        $extension = $file->getClientOriginalExtension();
        if ($extension != 'csv') throw new \DomainException('Arquivo Inválido');

        return $file->move(storage_path('importacao'), uniqid() . '.' . $extension);
    }
}
