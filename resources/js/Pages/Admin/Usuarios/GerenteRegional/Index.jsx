import Layout from "@/Layouts/Admin/Layout";
import convertFloatToMoney from "@/utils/convertFloatToMoney";

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
                <table className="table table-sm text-sm">
                    <thead>
                    <tr>
                        <th className="col-1">Cód.</th>
                        <th>Nome</th>
                        <th>Meta<br/> 1°Semestre</th>
                        <th>Meta<br/> 2° Semestre</th>
                        <th className="col-1">Meta <br/>Anual</th>
                        <th className="col-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{usuario.codigo}</td>
                                <td className="text-wrap"><b>{usuario.nome}</b></td>
                                <td className="text-wrap text-">R$ {usuario.meta_semestre_1 && <>{convertFloatToMoney(usuario.meta_semestre_1)}</>}</td>
                                <td className="text-wrap">R$ {usuario.meta_semestre_2 && <>{convertFloatToMoney(usuario.meta_semestre_2)}</>}</td>
                                <td className="text-wrap">R$ {convertFloatToMoney(usuario.meta_semestre_1 + usuario.meta_semestre_2)}</td>
                                <td className="text-center">
                                    <a className="btn btn-primary btn-sm px-3"
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
