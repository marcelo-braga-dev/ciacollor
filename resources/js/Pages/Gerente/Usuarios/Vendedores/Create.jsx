import Layout from "@/Layouts/Gerente/Layout";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

export default function ({gerentes}) {
    const {post, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        post(route('gerente.usuarios.vendedores.store'))
    }

    return (
        <Layout container titlePage="Vendedores" voltar={route('gerente.usuarios.vendedores.index')}
                menu="usuarios" submenu="vendedores">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <TextField label="Código" required fullWidth
                        onChange={e => setData('codigo', e.target.value)}/>
                    </div>
                    <div className="col-md-9 mb-4">
                        <TextField label="Nome" required fullWidth
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="E-mail" type="email" required fullWidth
                                   onChange={e => setData('email', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Senha" type="password" required fullWidth
                                   onChange={e => setData('senha', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField
                            select fullWidth required
                            label="Gerente Regional" defaultValue=""
                            onChange={e => setData('gerente', e.target.value)}>
                            {gerentes.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.codigo} - {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField  type="number" label="Meta Anual" required fullWidth
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
