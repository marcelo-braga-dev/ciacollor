import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";
import {router} from "@inertiajs/react";

export default function ({dados, gerentes}) {
    const {data, setData} = useForm({
        codigo: dados.codigo,
        nome:  dados.nome,
        email:  dados.email,
        gerente:  dados.superior_id,
        meta: dados.meta_anual
    })

    function submit(e) {
        e.preventDefault()
        router.put(route('admin.usuarios.vendedores.update', dados.id), {
            '_method' : 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Editar Dados Vendedor" menu="usuarios" submenu="vendedores"
                voltar={route('admin.usuarios.vendedores.show', dados.id)}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-2 mb-4">
                        <TextField label="Código" required fullWidth value={data.codigo}
                        onChange={e => setData('codigo', e.target.value)}/>
                    </div>
                    <div className="col-md-9 mb-4">
                        <TextField label="Nome" required fullWidth value={data.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <TextField label="E-mail" type="email" required fullWidth value={data.email}
                                   onChange={e => setData('email', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField
                            select fullWidth required
                            label="Gerente Regional" defaultValue={data.gerente}
                            onChange={e => setData('gerente', e.target.value)}>
                            {gerentes.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.codigo} - {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField label="Meta Anual" required fullWidth value={data.meta}
                                   onChange={e => setData('meta', e.target.value)}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
