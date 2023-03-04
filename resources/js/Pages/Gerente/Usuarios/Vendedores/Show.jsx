import Layout from "@/Layouts/Gerente/Layout";
import DadosUsuario from "@/Components/Usuarios/DadosUsuario";

export default function ({dados}) {
    return (
        <Layout container titlePage="Informações do Vendedor" voltar={route('gerente.usuarios.vendedores.index')}
                menu="usuarios" submenu="vendedores">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <h6>Informações do Vendedor</h6>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm"
                       href={route('gerente.usuarios.vendedores.edit', dados.id)}>Editar</a>
                </div>
            </div>

            <DadosUsuario dados={dados}/>
        </Layout>
    )
}
