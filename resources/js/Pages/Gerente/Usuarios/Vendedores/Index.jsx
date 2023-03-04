import Layout from "@/Layouts/Gerente/Layout";

export default function ({usuarios}) {
    return (
        <Layout container titlePage="Vendedores" menu="usuarios" submenu="vendedores">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Vendedores</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm" href={route('gerente.usuarios.vendedores.create')}>
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
                        <th>Meta Anual</th>
                        <th>Gerente</th>
                        <th>Cadastro</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td><b>{usuario.nome}</b></td>
                                <td>{usuario.meta_anual && <>R$ {usuario.meta_anual}</>}</td>
                                <td>{usuario.superior_nome}</td>
                                <td>{usuario.data_cadastro}</td>
                                <td>
                                    <a className="btn btn-link text-dark p-0 m-0"
                                    href={route('gerente.usuarios.vendedores.show', usuario.id)}>Ver</a>
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
