import Layout from "@/Layouts/Admin/Layout";
import {LinearProgress, Skeleton, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";
import axios from "axios";
import {useEffect, useState} from "react";

export default function ({usuarios}) {
    const {data, setData} = useForm({})
    const [dadosTable, setDadosTable] = useState([]);
    const [dadosTotais, setDadosTotais] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    function buscarDados(key, valor) {
        setData(key, valor)
        setLoading(true)
        axios.post(route('admin.faturamento.clientes-filtro', {...data, [key]: valor}))
            .then((response) => {
                setDadosTable(response.data.tabela)
                setDadosTotais(response.data.totais)
                setLoading(false)
            })
    }

    useEffect(() => {
        axios.post(route('admin.faturamento.clientes-filtro', {...data}))
            .then((response) => {
                setDadosTable(response.data.tabela)
                setDadosTotais(response.data.totais)
            })
        axios.post(route('admin.faturamento.clientes-clientes', {...data}))
            .then((response) => {
                setClientes(response.data)
            })
    }, []);

    //LOading
    const loadingAnimation = () => {
        return <div className="row pt-4"><LinearProgress/></div>
    }

    return (
        <Layout container titlePage="Faturamento Vendedores" menu="faturamento" submenu="clientes">
            <h6>Filtros</h6>
            <div className="row mb-4">
                <div className="col-md-6 p-3 shadow">
                    <div className="row mb-4">
                        <div className="col">
                            <label className="form-label">Ano a Comparar</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('ano_comparar', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </div>
                        <div className="col">
                            <label className="form-label">Ano a Analisar</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('ano_analizar', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </div>
                        <div className="col">
                            <label className="form-label">M??s</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('mes', e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="1">JAN</MenuItem>
                                <MenuItem value="2">FEV</MenuItem>
                                <MenuItem value="3">MAR</MenuItem>
                                <MenuItem value="4">ABR</MenuItem>
                                <MenuItem value="5">MAI</MenuItem>
                                <MenuItem value="6">JUN</MenuItem>
                                <MenuItem value="7">JUL</MenuItem>
                                <MenuItem value="8">AGO</MenuItem>
                                <MenuItem value="9">SET</MenuItem>
                                <MenuItem value="10">OUT</MenuItem>
                                <MenuItem value="11">NOV</MenuItem>
                                <MenuItem value="12">DEZ</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 shadow p-3">
                <div className="col-md-4 mb-4">
                    <TextField size="small" select fullWidth label="Gerente Regional" defaultValue=""
                               onChange={e => buscarDados('gerente', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {usuarios.gerente_regional.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-md-4 mb-4">
                    <TextField size="small" select fullWidth label="Vendedores" defaultValue=""
                               onChange={e => buscarDados('vendedor', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {usuarios.vendedor.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-md-4 mb-4">
                    <TextField size="small" select fullWidth label="Clientes" defaultValue=""
                               onChange={e => buscarDados('cliente', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {clientes.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.cliente}>
                                    {option.cliente}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>
            {loading ? loadingAnimation() : ''}
            {dadosTable.length ? <>
                <div className="row mb-4">
                    <div className="col shadow">
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <td></td>
                                <td>FATURAMENTO</td>
                                <td>LITROS</td>
                                <td>TICKET M??DIO</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Ano A Comparar</td>
                                <td>R$ {dadosTotais.comparar_faturado}</td>
                                <td>{dadosTotais.comparar_litros}</td>
                                <td>R$ {dadosTotais.comparar_ticket}</td>
                            </tr>
                            <tr>
                                <td>Ano An??lise</td>
                                <td>R$ {dadosTotais.analisar_faturado}</td>
                                <td>{dadosTotais.analisar_litros}</td>
                                <td>R$ {dadosTotais.analisar_ticket}</td>
                            </tr>
                            <tr>
                                <td>Tx. de Crescimento Faturamento</td>
                                <td>{dadosTotais.taxa_faturado}%</td>
                                <td>{dadosTotais.taxa_litros}%</td>
                                <td>{dadosTotais.taxa_ticket}%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-r">
                        <thead>
                        <tr className="text-center">
                            <th className="text-right" rowSpan={2}>CLIENTES</th>
                            <th className="bg-warning text-white" colSpan={2}>Ano a Comparar</th>
                            <th className="bg-primary" colSpan={2}>Ano de An??lise</th>
                        </tr>
                        <tr>
                            <th className="bg-warning text-white">Faturamento</th>
                            <th className="bg-warning text-white">Total Litros</th>
                            <th className="bg-primary">Faturamento</th>
                            <th className="bg-primary">Total Litros</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dadosTable.map((item, index) => {
                            return (
                                <tr key={index} className="text-center">
                                    <td className="text-start"><b>{item.vendedor}</b></td>
                                    <td>R$ {item.comparar.faturamento}</td>
                                    <td>{item.comparar.litros}</td>
                                    <td>R$ {item.analizar.faturamento}</td>
                                    <td>{item.analizar.litros}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </> : loadingAnimation()}
        </Layout>
    )
}
