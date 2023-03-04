import Layout from "@/Layouts/Admin/Layout";

export default function ({usuarios}) {
    return (
        <Layout container titlePage="Gerentes Regionais" menu="usuarios" submenu="gerente_regional">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Gerentes Regionais</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm" href={route('admin.usuarios.gerente-regional.create')}>
                        Cadastrar Gerentes Regionais
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
                        <th className="col-1">Cadastro</th>
                        <th className="col-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td><b>{usuario.nome}</b></td>
                                <td>{usuario.meta_anual && <>R$ {usuario.meta_anual}</>}</td>
                                <td>{usuario.data_cadastro}</td>
                                <td className="text-center">
                                    <a className="btn btn-link text-dark p-0 m-0"
                                    href={route('admin.usuarios.gerente-regional.show', usuario.id)}>Ver</a>
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
