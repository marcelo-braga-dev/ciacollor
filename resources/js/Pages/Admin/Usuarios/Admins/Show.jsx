import Layout from "@/Layouts/Admin/Layout";
import DadosUsuario from "@/Components/Usuarios/DadosUsuario";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações do Admin" voltar={route('admin.usuarios.admins.index')}
                menu="usuarios" submenu="admins">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Informações do Admin</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm"
                       href={route('admin.usuarios.admins.edit', dados.id)}>Editar</a>
                </div>
            </div>

            <DadosUsuario dados={dados}/>
        </Layout>
    )
}
