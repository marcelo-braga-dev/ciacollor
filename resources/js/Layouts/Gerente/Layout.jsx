import {Head} from '@inertiajs/react';

import ModalsAllerts from "@/Components/Modals/AlertsModals";
import Sidebar from "./Templates/Sidebar";
import Navbar from "./Templates/Navbar";

export default function Layout({children, titlePage, container, voltar, menu, submenu, errors = []}) {

    return (<>
        <Head><title>{titlePage}</title></Head>
        <ModalsAllerts/>
        <div className="row g-0">
            <div className="col-3 d-none d-lg-block bg-primary min-vh-100 w-20">
                <Sidebar menuSidebar={menu} submenuSidebar={submenu}/>
            </div>
            <div className="col-9 w-80">
                <Navbar titlePage={titlePage}/>
                <main className="container mt-5">
                    {container ? voltar ? <div className="bg-white px-lg-4 pb-4 mb-4 rounded">
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                <a className="btn btn-link btn-sm text-dark" href={voltar}>
                                    <i className="fas fa-arrow-left me-1"></i>
                                    Voltar
                                </a>
                            </div>
                        </div>
                        {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                        {children}
                    </div> : <>
                        <div className="bg-white px-lg-4 py-lg-4 mb-4 rounded">
                            {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                            {children}
                        </div>
                    </> : children}
                </main>
            </div>
        </div>
    </>);
}
