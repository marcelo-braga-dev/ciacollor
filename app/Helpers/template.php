<?php

if (!function_exists('print_pre')) {
    function print_pre($valor, $titulo = null)
    {
        echo
            '<style>body{background-color: black; color: white}</style>
            <h2>' . $titulo . '</h2>
         <pre>';
        print_r($valor);
        echo
        '<pre>';
        exit();
    }
}

if (!function_exists('modalSucesso')) {
    function modalSucesso($mensagem)
    {
        session()->flash('sucesso', $mensagem);
    }
}

if (!function_exists('modalErro')) {
    function modalErro($mensagem)
    {
        session()->flash('erro', $mensagem);
    }
}
