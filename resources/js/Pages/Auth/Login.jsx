import {useEffect} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormControlLabel, TextField} from "@mui/material";

export default function Login({status, canResetPassword}) {

    const logo = "/storage/crm/imagens/logo.png";

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                    <div className="row mb-4 w-100">
                        <div className="col-auto text-center">
                            <img src={logo} className="w-60" alt="logo"/>
                        </div>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            id="email"
                            type="email"
                            name="email"
                            label="E-mail"
                            value={data.email}
                            className="block w-full"
                            isFocused={true}
                            onChange={onHandleChange}
                            fullWidth
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <TextField
                            fullWidth
                            id="password"
                            label="Senha"
                            size="small"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full"
                            onChange={onHandleChange}
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="block mt-2">
                        <label className="flex items-center">
                            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange}/>
                            <span className="ms-2 text-sm text-gray-600">Lembrar senha</span>
                        </label>
                    </div>

                    <div className="flex items-center text-center justify-end mt-3">
                        {!canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className=""
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <button type="submit" className="btn btn-primary ml-4">
                            Entrar
                        </button>
                    </div>
            </form>
        </GuestLayout>
    );
}
