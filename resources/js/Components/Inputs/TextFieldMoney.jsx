import {InputAdornment, TextField} from "@mui/material";
import {useEffect} from 'react'

export default function TextFieldMoney({ label, value, setData, index, required }) {
    //if (required) required=true
    function maskMoney(valor) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = { minimumFractionDigits: 2 }
        const result = new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / 100
        )
        setData(index, result)
    }

    return (
        <TextField
            label={label} fullWidth required={required}
            InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
            value={value === 0 ? '' : (value ?? '')}
            onChange={e => maskMoney(e.target.value)}/>
    );
}
