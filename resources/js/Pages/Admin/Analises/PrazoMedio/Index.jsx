import Layout from "@/Layouts/Admin/Layout";
import {LinearProgress, Skeleton, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";
import axios from "axios";
import {useEffect, useState} from "react";
import convertFloatToMoney from "@/utils/convertFloatToMoney";

export default function ({usuarios}) {
    const {data, setData} = useForm({})
    const [dadosTable, setDadosTable] = useState([]);
    const [media, setMedia] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vendedores, setVendedores] = useState([]);

    function setDadados(tabela, media) {
        setDadosTable(tabela)
        setMedia(media)
    }

    function buscarDados(key, valor) {
        setData(key, valor)
        setLoading(true)
        axios.post(route('admin.analise.prazo-medio-filtro', {...data, [key]: valor}))
            .then((response) => {
                setDadados(response.data.tabela, response.data.media)
                setDadosTable(response.data.tabela)
                setLoading(false)
                console.log(response)
            })
    }

    useEffect(() => {
        setLoading(true)
        axios.post(route('admin.analise.prazo-medio-filtro', {...data}))
            .then((response) => {
                setDadados(response.data.tabela, response.data.media)
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        axios.post(route('admin.analise.prazo-medio-clientes', {...data}))
            .then((response) => {
                setClientes(response.data.clientes)
                setVendedores(response.data.vendedores)
            })
    }, [dadosTable]);

    //LOading
    const loadingAnimation = () => {
        return <div className="row pt-4"><LinearProgress/></div>
    }

    return (
        <Layout container titlePage="Faturamento Vendedores" menu="analises" submenu="prazo_medio">
            <h6>Filtros</h6>
            <div className="row mb-4">
                <div className="col-md-6 p-3 shadow">
                    <div className="row mb-4">
                        <div className="col">
                            <label className="form-label">Ano</label>
                            <TextField size="small" select fullWidth defaultValue=""
                                       onChange={e => buscarDados('ano', e.target.value)}>
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
                <div className="col-md-3 text-center mx-4">
                    <div className="bg-success p-3 rounded text-white">
                        <h6>Prazo M??dio</h6>
                        <h3 className="d-block">{convertFloatToMoney(media, 1)}</h3>
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
                        {vendedores.map((option, index) => {
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
                <div className="table-responsive mt-4">
                    <table className="table table-sm text-sm mt-4 table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>Vendedor</th>
                            <th>Cliente</th>
                            <th>Valor Total</th>
                            <th>Prazo M??dio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dadosTable.map((item, index) => {
                            return (
                                <tr key={index} className="text-center">
                                    <td className="text-wrap text-start">{item.vendedor}</td>
                                    <td className="text-wrap text-start">{item.cliente}</td>
                                    <td>R$ {convertFloatToMoney(item.valor)}</td>
                                    <td>{convertFloatToMoney(item.prazo, 0)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </> : 'Nenhuma informa????o encontrada!'}
        </Layout>
    )
}
