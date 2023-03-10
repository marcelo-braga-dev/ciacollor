import Layout from "@/Layouts/Admin/Layout";
import convertFloatToMoney from "@/utils/convertFloatToMoney";
import {LinearProgress} from "@mui/material";
import {useState, useEffect} from "react";

export default function Dashboard({produtos}) {
    const [dadosProdutos, setDadosProdutos] = useState([]);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalProdutosGeral, setTotalProdutosGeral] = useState(0);

    useEffect(() => {
        setDadosProdutos(produtos.tabela)
        setTotalProdutos(produtos.total)
        setTotalProdutosGeral(produtos.total_geral)
    }, []);
    console.log(dadosProdutos)
    const loadingAnimation = () => {
        return <div className="row pt-4"><LinearProgress/></div>
    }

    return (
        <Layout titlePage="Dashboard" menu="dashboard" submenu="relatorios">
            <div className="mx-auto">
                <div className="bg-white rounded overflow-hidden shadow-sm p-4">
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <DescontoMedio />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <MediaMC />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*{dadosProdutos.length ? <>*/}
                    {/*    <div className="table-responsive mt-4">*/}
                    {/*        <table*/}
                    {/*            className="table table-sm text-sm mt-4 table-striped table-bordered table-hover">*/}
                    {/*            <thead>*/}
                    {/*            <tr>*/}
                    {/*                <th>Produto</th>*/}
                    {/*                <th>Vlr. Faturamento</th>*/}
                    {/*                <th>Impacto</th>*/}
                    {/*            </tr>*/}
                    {/*            </thead>*/}
                    {/*            <tbody>*/}
                    {/*            {dadosProdutos.map((item, index) => {*/}
                    {/*                if (index >= 5) return*/}

                    {/*                return (*/}
                    {/*                    <tr key={index} className="text-center">*/}
                    {/*                        <td className="text-wrap text-start">{item.produto}</td>*/}
                    {/*                        <td>R$ {convertFloatToMoney(item.valor)}</td>*/}
                    {/*                        <td className="text-wrap text-start">{convertFloatToMoney((item.valor/totalProdutosGeral)*100)}%</td>*/}
                    {/*                    </tr>*/}
                    {/*                )*/}
                    {/*            })}*/}
                    {/*            <tr  className="text-center bg-primary">*/}
                    {/*                <td className="text-wrap text-start"><b>TOTAL GERAL</b></td>*/}
                    {/*                <td>R$ {convertFloatToMoney(totalProdutos)}</td>*/}
                    {/*                <td className="text-wrap text-start">{convertFloatToMoney((totalProdutos/totalProdutosGeral)*100)}%</td>*/}
                    {/*            </tr>*/}
                    {/*            </tbody>*/}
                    {/*        </table>*/}
                    {/*    </div>*/}
                    {/*</> : loadingAnimation()}*/}
                </div>
            </div>
        </Layout>
    );
}
