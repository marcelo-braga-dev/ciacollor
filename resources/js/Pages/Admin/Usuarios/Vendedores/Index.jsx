import Layout from "@/Layouts/Admin/Layout";

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
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-1">Código</th>
                        <th>Nome</th>
                        <th>Gerente</th>
                        <th>Meta 1° Semestre</th>
                        <th>Meta 2° Semestre</th>
                        <th>Meta Anual</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td><b>{usuario.nome}</b></td>
                                <td>{usuario.superior_nome}</td>
                                <td>{usuario.meta_semestre_1 && <>R$ {usuario.meta_semestre_1}</>}</td>
                                <td>{usuario.meta_semestre_2 && <>R$ {usuario.meta_semestre_2}</>}</td>
                                <td>{usuario.meta_semestre_1 && usuario.meta_semestre_1 + usuario.meta_semestre_2}</td>
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
