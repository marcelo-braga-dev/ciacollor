export default function convertFloatToMoney(valor, precisao = 2) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: precisao, maximumFractionDigits: precisao
    }).format(valor)
}
export const convertMoneyFloat = (valor) => {
    valor = valor.toString()
    return parseFloat(valor.replace('.', '')
        .replace(',', '')
        .replace(/\D/g, '')) / 100
}

export const somarStringToFloat = (valor1, valor2) => {
    return  convertMoneyFloat(valor1) + convertMoneyFloat(valor2)
}
