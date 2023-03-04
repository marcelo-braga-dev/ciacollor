<?php

if (!function_exists('convert_float_money')) {
    function convert_float_money($arg, $decimais = 2)
    {
        if (is_numeric($arg)) {
            $arg = number_format($arg, $decimais, ',', '.');
        }
        return $arg;
    }
}

if (!function_exists('convert_money_float')) {
    function convert_money_float($arg, $decimais = 2)
    {
        try {
            if (is_string($arg)) {
                $arg = str_replace('.', '', $arg);
                $arg = str_replace(',', '.', $arg);
                $arg = number_format($arg, $decimais, '.', '');
            }
        } catch (ErrorException $exception) {
            return $arg;
        }
        return $arg;
    }
}
