import Layout from "@/Layouts/Admin/Layout";
import convertFloatToMoney from "@/utils/convertFloatToMoney";
import {LinearProgress, TextField} from "@mui/material";
import {useState, useEffect} from "react";
import DescontoMedio from "./Graficos/DescontoMedio";
import MediaMC from "./Graficos/MediaMC";
import PrazoMedio from "./Graficos/PrazoMedio";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {useForm} from "@inertiajs/react";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);

    const [gerenteFiltro, setGerenteFiltro] = useState([]);
    const [vendedoresFiltro, setVendedoresFiltro] = useState([]);
    const [gruposFiltro, setGruposFiltro] = useState([]);

    const {data, setData} = useForm({})

    // PRODUTOS
    const [dadosProdutos, setDadosProdutos] = useState([]);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalProdutosGeral, setTotalProdutosGeral] = useState(0);

    function preencheProdutos(dados) {
        setDadosProdutos(dados.tabela)
        setTotalProdutos(dados.total)
        setTotalProdutosGeral(dados.total_geral)
    }
    // PRODUTOS - fim

    // GERENTES
    const [dadosGerentes, setDadosGerentes] = useState([]);
    const [totalGerentes, setTotalGerentes] = useState(0);
    const [totalGeralGerentes, setTotalGeralGerentes] = useState(0);

    function preencheGerentes(dados) {
        setDadosGerentes(dados.tabela)
        setTotalGerentes(dados.total_selecionados)
        setTotalGeralGerentes(dados.total_geral)
    }
    // GERENTES - fim

    // VENDEDORES
    const [dadosVendedores, setDadosVendedores] = useState([]);
    const [totalVendedores, setTotalVendedores] = useState(0);
    const [totalGeralVendedores, setTotalGeralVendedores] = useState(0);

    function preencheVendedores(dados) {
        setDadosVendedores(dados.tabela)
        setTotalVendedores(dados.total_selecionados)
        setTotalGeralVendedores(dados.total_geral)
    }
    // VENDEDORES - fim

    // Filtro
    function buscarDados(key, valor) {
        setData(key, valor)
    }

    useEffect(() => {
        setLoading(true)
        axios.post(route('admin.dashboard.relatorios-filtro', {...data}))
            .then((response) => {
                preencheVendedores(response.data.vendedores)
                preencheGerentes(response.data.gerentes)
                preencheProdutos(response.data.produtos)
                setLoading(false)
            })
        axios.post(route('admin.dashboard.relatorios-filtro-usuarios', {...data}))
            .then((response) => {
                setGerenteFiltro(response.data.gerentes)
                setVendedoresFiltro(response.data.vendedores)
                setGruposFiltro(response.data.grupos)

                setLoading(false)
            })
    }, [data]);
    // Filtro - fim

    const loadingAnimation = () => {
        return <div className="row pt-4"><LinearProgress/></div>
    }

    return (
        <Layout titlePage="Dashboard" menu="dashboard" submenu="relatorios">

            {/*Filtro usuarios*/}
            <div className="row mb-4 shadow p-3">
                <div className="col-md-2">
                    <TextField size="small" select fullWidth defaultValue="" label="Ano"
                               onChange={e => buscarDados('ano', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="2021">2021</MenuItem>
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                    </TextField>
                </div>
                <div className="col-md-2">
                    <TextField size="small" select fullWidth defaultValue="" label="Mês"
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
                <div className="col-md-3 mb-4">
                    <TextField size="small" select fullWidth label="Grupos" defaultValue=""
                               onChange={e => buscarDados('grupo', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {gruposFiltro.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.cod}>
                                    {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-md-3 mb-4">
                    <TextField size="small" select fullWidth label="Gerente Regional" defaultValue=""
                               onChange={e => buscarDados('gerente', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {gerenteFiltro.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-md-2 mb-4">
                    <TextField size="small" select fullWidth label="Vendedores" defaultValue=""
                               onChange={e => buscarDados('vendedor', e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        {vendedoresFiltro.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>
            {/*Filtro usuarios - fim*/}

            <div className="mx-auto">

                <div className="bg-white rounded overflow-hidden shadow-sm pb-4 px-4">
                    {loading ? loadingAnimation() : ''}
                    <span className="text-danger">Gráficos em Manutenção</span>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <DescontoMedio />
                        </div>
                        <div className="col-md-4">
                            <MediaMC />
                        </div>
                        <div className="col-md-4">
                            <PrazoMedio />
                        </div>
                    </div>

                    {/*PRODUTOS*/}
                    {dadosProdutos.length ? <>
                        <div className="table-responsive mt-4">
                            <table
                                className="table table-sm text-sm mt-4 table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Vlr. Faturamento</th>
                                    <th>Impacto</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dadosProdutos.map((item, index) => {
                                    if (index >= 5) return

                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="text-wrap text-start">{item.produto}</td>
                                            <td>R$ {convertFloatToMoney(item.valor)}</td>
                                            <td className="text-wrap text-start">{convertFloatToMoney((item.valor/totalProdutosGeral)*100)}%</td>
                                        </tr>
                                    )
                                })}
                                <tr  className="text-center bg-primary">
                                    <td className="text-wrap text-start"><b>TOTAL GERAL</b></td>
                                    <td>R$ {convertFloatToMoney(totalProdutos)}</td>
                                    <td className="text-wrap text-start">{convertFloatToMoney((totalProdutos/totalProdutosGeral)*100)}%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : ''}

                    {/*GERENTES*/}
                    {dadosGerentes.length ? <>
                        <div className="table-responsive mt-4">
                            <table
                                className="table table-sm text-sm mt-4 table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>Gerentes</th>
                                    <th>Vlr. Faturamento</th>
                                    <th>Impacto</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dadosGerentes.map((item, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="text-wrap text-start">{item.nome}</td>
                                            <td>R$ {convertFloatToMoney(item.valor)}</td>
                                            <td className="text-wrap text-start">{convertFloatToMoney((item.valor/totalGeralGerentes)*100)}%</td>
                                        </tr>
                                    )
                                })}
                                <tr  className="text-center bg-primary">
                                    <td className="text-wrap text-start"><b>TOTAL GERAL</b></td>
                                    <td>R$ {convertFloatToMoney(totalGerentes)}</td>
                                    <td className="text-wrap text-start">{convertFloatToMoney((totalGerentes/totalGeralGerentes)*100)}%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : ''}

                    {/*VENDEDORES*/}
                    {dadosVendedores.length ? <>
                        <div className="table-responsive mt-4">
                            <table
                                className="table table-sm text-sm mt-4 table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>VENDEDORES</th>
                                    <th>Vlr. Faturamento</th>
                                    <th>Impacto</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dadosVendedores.map((item, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="text-wrap text-start">{item.nome}</td>
                                            <td>R$ {convertFloatToMoney(item.valor)}</td>
                                            <td className="text-wrap text-start">{convertFloatToMoney((item.valor/totalGeralVendedores)*100)}%</td>
                                        </tr>
                                    )
                                })}
                                <tr  className="text-center bg-primary">
                                    <td className="text-wrap text-start"><b>TOTAL GERAL</b></td>
                                    <td>R$ {convertFloatToMoney(totalVendedores)}</td>
                                    <td className="text-wrap text-start">{convertFloatToMoney((totalVendedores/totalGeralVendedores)*100)}%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : ''}
                </div>
            </div>
        </Layout>
    );
}
