import Layout from "@/Layouts/Admin/Layout";
import {LinearProgress, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {round} from "lodash";
import {useForm} from "@inertiajs/react";
import axios from "axios";
import {useEffect, useState} from "react";

export default function ({vendedores, gerentes}) {
    const {data, setData} = useForm({
        periodo: 'ano'
    });

    const [metaAnual, setMetaAnual] = useState(0);
    const [vendasComparar, setVendasComparar] = useState(0);
    const [vendasAnalisar, setVendasAnalisar] = useState(0);
    const [listaVendedores, setListaVendedores] = useState(vendedores);
    const [loading, setLoading] = useState(false);

    function buscarDados(key, valor) {
        setData(key, valor)
        setLoading(true)
        axios.post(route('admin.gestao-metas.filtro', {...data, [key]: valor}))
            .then((response) => {
                setMetaAnual(response.data.meta)
                setVendasAnalisar(response.data.vendas_analisar)
                setVendasComparar(response.data.vendas_comparar)
                if (response.data.vendedores) setListaVendedores(response.data.vendedores)
                setLoading(false)
            })
    }

    const metaAno = round(metaAnual / 12, 2)
    const metaAnoFloat = round(metaAnual / 12, 2)

    useEffect(() => {
        // setLoading(true)
        axios.post(route('admin.gestao-metas.filtro', {...data}))
            .then((response) => {
                setMetaAnual(response.data.meta)
                setVendasAnalisar(response.data.vendas_analisar)
                setVendasComparar(response.data.vendas_comparar)
                setLoading(false)
            })
    }, []);

    //LOading

    const loadingAnimation = () => {
        return <div className="row pt-4"><LinearProgress/></div>
    }

    function convertMoney(valor) {
        const valorConvertido = valor?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })

        if (valor < 0) return <span className="text-danger bg-white p-1 rounded">{valorConvertido}</span>
        return valorConvertido
    }

    const tri1 = () => vendasAnalisar[1].valor + vendasAnalisar[2].valor + vendasAnalisar[3].valor
    const tri2 = () => vendasAnalisar[4].valor + vendasAnalisar[5].valor + vendasAnalisar[6].valor
    const tri3 = () => vendasAnalisar[7].valor + vendasAnalisar[8].valor + vendasAnalisar[9].valor
    const tri4 = () => vendasAnalisar[10].valor + vendasAnalisar[11].valor + vendasAnalisar[12].valor

    const metaTri = () => metaAno * 3

    return (
        <Layout container titlePage="Gest??o de Metas" menu="gestao_metas" submenu="geral">
            <div className="row mb-4 justify-content-between">
                <div className="col-md-3 shadow pb-3 rounded">
                    <div className="row p-3">
                        <div className="col-12 mb-3">
                            <label className="form-label">Ano a An??lise</label>
                            <TextField size="small" select fullWidth defaultValue=''
                                       onChange={e => buscarDados('ano_analise', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ano a Comparar</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('ano_comparar', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Per??odo</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('periodo', e.target.value)}>
                                <MenuItem value="1">1?? Semestre</MenuItem>
                                <MenuItem value="2">2?? Semestre</MenuItem>
                                <MenuItem value="ano">Anual</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-12 mt-3">
                            <label className="form-label">Gerentes</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('gerente', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {gerentes.map((vendedor, index) => {
                                    return (
                                        <MenuItem key={index} value={vendedor.id}>
                                            {vendedor.codigo}-{vendedor.nome}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </div>

                        <div className="col-12 mt-3">
                            <label className="form-label">Vendedores</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('vendedor', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {listaVendedores.map((vendedor, index) => {
                                    return (
                                        <MenuItem key={index} value={vendedor.id}>
                                            {vendedor.codigo}-{vendedor.nome}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row mb-3">
                        <div className="col-md-5 bg-primary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">META PREVISTA ANO {data.ano_analise}:</small>
                            R$ {metaAnual?.toLocaleString()}
                        </div>
                        <div className="col-md-5 bg-primary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">VENDA ACUMULADA {data.ano_analise}:</small>
                            R$ {vendasComparar && vendasComparar['total']?.toLocaleString()}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-5 bg-primary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">META REALIZADA:</small>
                            {round(vendasComparar?.total / metaAnual, 3)}%
                        </div>
                        <div className="col-md-5 bg-primary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">VALOR PARA ATINGIR META:</small>
                            R$ {vendasComparar && (metaAnual - vendasComparar['total']).toLocaleString()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 bg-primary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">% PARA ATINGIR META:</small>
                            {round((Math.abs(vendasComparar?.total / metaAnual)), 3)} %
                        </div>
                    </div>
                </div>
            </div>

            {loading ? loadingAnimation() : ''}
            {metaAnual ? <>
                <h6>An??lise Vendas no M??s</h6>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr className="text-center">
                            <th className="bg-primary">M??s</th>
                            <th className="bg-primary">Meta {data.periodo === 'ano' ? 'Ano' : (data.periodo === 1 ? '1?? Semestre' : '2?? Semestre') }</th>
                            <th className="bg-primary">Vendas {data.ano_analise ?? 'Total'}</th>
                            <th className="bg-primary">Vendas {data.ano_comparar ?? 'Total'}</th>
                            <th className="bg-primary">Vendas {data.ano_analise} X<br/> Vendas {data.ano_comparar}</th>
                            <th className="bg-primary">Vendas {data.ano_analise} X<br/> Metas {data.ano_comparar}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="font-weight-bold">Janeiro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[1].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[1].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[1].valor_float - vendasAnalisar[1].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[1].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Fevereiro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[2].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[2].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[2].valor_float - vendasAnalisar[2].valor_float)}
                            </td>
                            <td>{vendasComparar && convertMoney(vendasComparar[2].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Mar??o</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[3].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[3].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[3].valor_float - vendasAnalisar[3].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[3].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Abril</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[4].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[4].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[4].valor_float - vendasAnalisar[4].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[4].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Maio</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[5].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[5].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[5].valor_float - vendasAnalisar[5].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[5].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Junho</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[6].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[6].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[6].valor_float - vendasAnalisar[6].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[6].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Julho</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[7].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[7].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[7].valor_float - vendasAnalisar[7].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[7].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Agosto</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[8].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[8].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[8].valor_float - vendasAnalisar[8].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[8].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Setembro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[9].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[9].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[9].valor_float - vendasAnalisar[9].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[9].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Outubro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[10].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[10].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[10].valor_float - vendasAnalisar[10].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[10].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Novembro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[11].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[11].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[11].valor_float - vendasAnalisar[11].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[11].valor_float - metaAnoFloat)}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Dezembro</td>
                            <td>{convertMoney(metaAno)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[12].valor)}</td>
                            <td>{vendasAnalisar && convertMoney(vendasAnalisar[12].valor)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[12].valor_float - vendasAnalisar[12].valor_float)}</td>
                            <td>{vendasComparar && convertMoney(vendasComparar[12].valor_float - metaAnoFloat)}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr className="text-center">
                            <th className="bg-dark text-white">Per??odo</th>
                            <th className="bg-dark text-white">Acumulado Venda</th>
                            <th className="bg-dark text-white">Meta Acumulada</th>
                            <th className="bg-dark text-white">Venda X Meta</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1?? Trimestre</td>
                            <td>{convertMoney(tri1())}</td>
                            <td>{convertMoney(metaTri())}</td>
                            <td>{convertMoney(tri1() - metaTri())}</td>
                        </tr>
                        <tr>
                            <td>2?? Trimestre</td>
                            <td>{convertMoney(tri2())}</td>
                            <td>{convertMoney(metaTri())}</td>
                            <td>{convertMoney(tri2() - metaTri())}</td>
                        </tr>
                        <tr>
                            <td>3?? Trimestre</td>
                            <td>{convertMoney(tri3())}</td>
                            <td>{convertMoney(metaTri())}</td>
                            <td>{convertMoney(tri3() - metaTri())}</td>
                        </tr>
                        <tr>
                            <td>4?? Trimestre</td>
                            <td>{convertMoney(tri4())}</td>
                            <td>{convertMoney(metaTri())}</td>
                            <td>{convertMoney(tri4() - metaTri())}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </> : loadingAnimation()}

        </Layout>
    )
}
