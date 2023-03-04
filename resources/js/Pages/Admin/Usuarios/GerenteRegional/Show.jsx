import Layout from "@/Layouts/Admin/Layout";
import DadosUsuario from "@/Components/Usuarios/DadosUsuario";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações do Gerente Regional" voltar={route('admin.usuarios.gerente-regional.index')}
                menu="usuarios" submenu="gerente_regional">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Informações do Gerente Regional</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm"
                       href={route('admin.usuarios.gerente-regional.edit', dados.id)}>Editar</a>
                </div>
            </div>

            <DadosUsuario dados={dados}/>
        </Layout>
    )
}
