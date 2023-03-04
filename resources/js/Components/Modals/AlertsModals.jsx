import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";

export default function ModalsAllerts() {
    const {flash} = usePage().props

    useEffect(() => {

        if (flash.sucesso) {
            setState({
                open: true,
                msg: flash.sucesso,
                alert: 'success'
            });
        }

        if (flash.erro) {
            setState({
                open: true,
                msg: flash.erro,
                alert: 'error'
            });
        }

    }, []);

    const [state, setState] = React.useState({
        open: false,
    });
    const {open, msg, alert} = state;

    const handleClose = () => {
        setState({...state, open: false});
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}>
                <Alert onClose={handleClose} severity={alert} sx={{width: '100%'}}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

