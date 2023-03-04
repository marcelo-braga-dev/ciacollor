import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function () {
    const {post, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        post(route('admin.produtos.importar.store'))
    }

    return (
        <Layout container titlePage="Importar Produtos" menu="produtos" submenu="importar">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <span className="d-block">Arquivo</span>
                        <TextField type="file"
                                   onChange={e => setData('arquivo', e.target.files[0])}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
