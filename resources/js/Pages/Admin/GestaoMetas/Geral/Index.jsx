import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {round} from "lodash";
import {useForm} from "@inertiajs/react";
import axios from "axios";
import {useEffect, useState} from "react";

export default function ({}) {
    const {data, setData} = useForm();

    const [metaAnual, setMetaAnual] = useState();
    const [vendasComparar, setVendasComparar] = useState();
    const [vendasAnalisar, setVendasAnalisar] = useState();

    function buscarDados(key, valor) {
        setData(key, valor)
        axios.post(route('admin.gestao-metas.filtro', {...data, [key]: valor}))
            .then((response) => {
                setMetaAnual(response.data.meta_anual)
                setVendasAnalisar(response.data.vendas_analisar)
                setVendasComparar(response.data.vendas_comparar)
            })

    }

    const metaAno = round(metaAnual / 12, 2)?.toLocaleString()
    const metaAnoFloat = round(metaAnual / 12, 2)

    useEffect(() => {
        axios.post(route('admin.gestao-metas.filtro'))
            .then((response) => {
                setMetaAnual(response.data.meta_anual)
                setVendasAnalisar(response.data.vendas_analisar)
                setVendasComparar(response.data.vendas_comparar)
            })
    }, []);

    return (
        <Layout container titlePage="Gestão de Metas" menu="gestao_metas" submenu="geral">
            <div className="row mb-4 justify-content-between">
                <div className="col-md-3 shadow pb-3 rounded">
                    <div className="row p-3">
                        <div className="col-12 mb-3">
                            <label className="form-label">Ano a Análise</label>
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
                    </div>
                </div>
                <div className="col-8">
                    <div className="row mb-3">
                        <div className="col-md-5 bg-secundary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">META PREVISTA ANO {data.ano_analise}:</small>
                            R$ {metaAnual?.toLocaleString()}
                        </div>
                        <div className="col-md-5 bg-secundary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">VENDA ACUMULADA {data.ano_analise}:</small>
                            R$ {vendasComparar && vendasComparar['total']?.toLocaleString()}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-5 bg-secundary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">META REALIZADA:</small>
                            {round(vendasComparar?.total / metaAnual, 3)}%
                        </div>
                        <div className="col-md-5 bg-secundary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">VALOR PARA ATINGIR META:</small>
                            R$ {vendasComparar && (metaAnual-vendasComparar['total']).toLocaleString()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 bg-secundary text-white p-2 rounded mx-3 px-3">
                            <small className="d-block font-weight-bold">% PARA ATINGIR META:</small>
                            {round((Math.abs(vendasComparar?.total / metaAnual)), 3)} %
                        </div>
                    </div>

                </div>
            </div>

            <div className="table-responsive">
                <h6>Análise Vendas no Mês</h6>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr className="text-center">
                        <th className="bg-primary">Mês</th>
                        <th className="bg-primary">Meta {data.ano_analise}</th>
                        <th className="bg-primary">Vendas {data.ano_analise}</th>
                        <th className="bg-primary">Vendas {data.ano_comparar}</th>
                        <th className="bg-primary">Vendas {data.ano_analise} X<br/> Vendas {data.ano_comparar}</th>
                        <th className="bg-primary">Vendas {data.ano_analise} X<br/> Metas {data.ano_comparar}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="font-weight-bold">Janeiro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[1].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[1].valor}</td>
                        <td>{vendasComparar && round(vendasComparar[1].valor_float - vendasAnalisar[1].valor_float, 2).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[1].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Fevereiro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[2].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[2].valor}</td>
                        <td>{vendasComparar && (vendasComparar[2].valor_float - vendasAnalisar[2].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                        </td>
                        <td>R$ {vendasComparar && (vendasComparar[2].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Março</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[3].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[3].valor}</td>
                        <td>{vendasComparar && (vendasComparar[3].valor_float - vendasAnalisar[3].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[3].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Abril</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[4].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[4].valor}</td>
                        <td>{vendasComparar && (vendasComparar[4].valor_float - vendasAnalisar[4].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[4].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Maio</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[5].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[5].valor}</td>
                        <td>{vendasComparar && (vendasComparar[5].valor_float - vendasAnalisar[5].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[5].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Junho</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[6].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[6].valor}</td>
                        <td>{vendasComparar && (vendasComparar[6].valor_float - vendasAnalisar[6].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[6].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Julho</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[7].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[7].valor}</td>
                        <td>{vendasComparar && (vendasComparar[7].valor_float - vendasAnalisar[7].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[7].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Agosto</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[8].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[8].valor}</td>
                        <td>{vendasComparar && (vendasComparar[8].valor_float - vendasAnalisar[8].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[8].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Setembro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[9].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[9].valor}</td>
                        <td>{vendasComparar && (vendasComparar[9].valor_float - vendasAnalisar[9].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[9].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Outubro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[10].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[10].valor}</td>
                        <td>{vendasComparar && (vendasComparar[10].valor_float - vendasAnalisar[10].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[10].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Novembro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[11].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[11].valor}</td>
                        <td>{vendasComparar && (vendasComparar[11].valor_float - vendasAnalisar[11].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[11].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Dezembro</td>
                        <td>R$ {metaAno}</td>
                        <td>R$ {vendasComparar && vendasComparar[12].valor}</td>
                        <td>R$ {vendasAnalisar && vendasAnalisar[12].valor}</td>
                        <td>{vendasComparar && (vendasComparar[12].valor_float - vendasAnalisar[12].valor_float).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}</td>
                        <td>R$ {vendasComparar && (vendasComparar[12].valor_float - metaAnoFloat).toLocaleString()}</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
