import Layout from "@/Layouts/Admin/Layout";

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
                        <th>Gerente Regional</th>
                        <th>Meta <br/>1° Semestre</th>
                        <th>Meta <br/>2° Semestre</th>
                        <th>Meta <br/>Anual</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td className="text-wrap"><b>{usuario.nome}</b></td>
                                <td className="text-wrap">{usuario.superior_nome}</td>
                                <td className="text-wrap">{usuario.meta_semestre_1 ? <>R$ {usuario.meta_semestre_1}</> : '-'}</td>
                                <td className="text-wrap">{usuario.meta_semestre_2 ? <>R$ {usuario.meta_semestre_2}</> : '-'}</td>
                                <td className="text-wrap">
                                    {usuario.meta_semestre_1 && usuario.meta_semestre_2 ?
                                        <>R$ {usuario.meta_semestre_1 + usuario.meta_semestre_2}</> : '-'}</td>
                                <td>
                                    <a className="btn btn-link text-dark p-0 m-0"
                                       href={route('admin.gestao-metas.vendedores.edit', usuario.id)}>
                                        Editar
                                    </a>
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
