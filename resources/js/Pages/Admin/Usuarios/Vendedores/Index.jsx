import Layout from "@/Layouts/Admin/Layout";
import convertFloatToMoney from "@/utils/convertFloatToMoney";

export default function ({usuarios}) {
    return (
        <Layout container titlePage="Vendedores" menu="usuarios" submenu="vendedores">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Vendedores</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm" href={route('admin.usuarios.vendedores.create')}>
                        Cadastrar Vendedor
                    </a>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-sm text-sm">
                    <thead>
                    <tr>
                        <th className="col-1">Cód.</th>
                        <th className="col-1">Nome</th>
                        <th className="col-1">Gerente</th>
                        <th className="col-1">Meta <br/>1° Semestre</th>
                        <th className="col-1">Meta <br/>2° Semestre</th>
                        <th className="col-1">Meta <br/>Anual</th>
                        <th className="col-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td className="text-wrap"><b>{usuario.nome}</b></td>
                                <td className="text-wrap">{usuario.superior_nome}</td>
                                <td className="text-wrap">{usuario.meta_semestre_1 && <>R$ {convertFloatToMoney(usuario.meta_semestre_1)}</>}</td>
                                <td className="text-wrap">{usuario.meta_semestre_2 && <>R$ {convertFloatToMoney(usuario.meta_semestre_2)}</>}</td>
                                <td className="text-wrap">{usuario.meta_semestre_1 && convertFloatToMoney(usuario.meta_semestre_1 + usuario.meta_semestre_2)}</td>
                                <td>
                                    <a className="btn btn-link text-dark p-0 m-0"
                                    href={route('admin.usuarios.vendedores.show', usuario.id)}>Ver</a>
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
