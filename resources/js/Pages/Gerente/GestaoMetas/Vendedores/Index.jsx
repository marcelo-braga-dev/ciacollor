import Layout from "@/Layouts/Gerente/Layout";
import convertFloatToMoney from "@/utils/convertFloatToMoney";

export default function ({usuarios}) {
    return (
        <Layout container titlePage="Metas dos Vendedores" menu="gestao_metas" submenu="vendedores">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Metas dos Vendedores</h6>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-sm text-sm">
                    <thead>
                    <tr>
                        <th className="col-1">Código</th>
                        <th>Nome</th>
                        <th>Meta <br/>1° Semestre</th>
                        <th>Meta <br/>2° Semestre</th>
                        <th>Meta <br/>Anual</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td className="text-wrap"><b>{usuario.nome}</b></td>
                                <td className="text-wrap">{usuario.meta_semestre_1 ? <>R$ {convertFloatToMoney(usuario.meta_semestre_1)}</> : '-'}</td>
                                <td className="text-wrap">{usuario.meta_semestre_2 ? <>R$ {convertFloatToMoney(usuario.meta_semestre_2)}</> : '-'}</td>
                                <td className="text-wrap">
                                    {usuario.meta_semestre_1 && usuario.meta_semestre_2 ?
                                        <>R$ {usuario.meta_semestre_1 + usuario.meta_semestre_2}</> : '-'}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
