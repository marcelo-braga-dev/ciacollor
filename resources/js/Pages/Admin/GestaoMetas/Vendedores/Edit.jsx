import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import {router} from "@inertiajs/react";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import convertFloatToMoney from "@/utils/convertFloatToMoney";

export default function ({dados}) {
    const {data, setData} = useForm({
        meta_semestre_1: convertFloatToMoney(dados.meta_semestre_1),
        meta_semestre_2: convertFloatToMoney(dados.meta_semestre_2)
    })

    function submit(e) {
        e.preventDefault()
        router.put(route('admin.gestao-metas.vendedores.update', dados.id), {
            '_method': 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Editar Dados Vendedor" menu="gestao_metas" submenu="vendedores"
                voltar={route('admin.gestao-metas.vendedores.index', dados.id)}>
            <div className="row mb-4">
                <div className="col">
                    <span className="d-block">Nome do Vendedor: {dados.nome}</span>
                    <span className="d-block">Código: {dados.codigo}</span>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <TextFieldMoney label="Meta 1° Semestre" index="meta_semestre_1" value={data.meta_semestre_1}
                                        setData={setData} required/>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextFieldMoney label="Meta 2° Semestre" index="meta_semestre_2" value={data.meta_semestre_2}
                                        setData={setData} required/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
