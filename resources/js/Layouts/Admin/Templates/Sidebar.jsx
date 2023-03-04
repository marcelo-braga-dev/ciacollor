import * as React from "react";

export default function Sidebar({menuSidebar, submenuSidebar}) {
    const logo = "/storage/crm/imagens/logo.png";

    const pages = [
        {
            'menu': 'Dashboard',
            'icone': 'fas fa-chart-line',
            'tagMenu': 'dashboard',
            'submenu': [
                {'menu': 'Relatórios', 'url': route('home'), 'tag': 'relatorios'},
            ]
        },
        {
            'menu': 'Gestão de Metas',
            'icone': 'fas fa-bullseye',
            'tagMenu': 'gestao_metas',
            'submenu': [
                {'menu': 'Geral', 'url': route('admin.gestao-metas.geral.index'), 'tag': 'geral'},
                {'menu': 'Gerentes', 'url': route('admin.gestao-metas.geral.index'), 'tag': 'gerentes'},
                {'menu': 'Vendedores', 'url': route('admin.gestao-metas.geral.index'), 'tag': 'vendedores'},
            ]
        },
        {
            'menu': 'Faturamento',
            'icone': 'fas fa-dollar-sign',
            'tagMenu': 'faturamento',
            'submenu': [
                {'menu': 'Geral', 'url': route('admin.faturamento.vendedores.index'), 'tag': 'vendedores'},
                // {'menu': 'Clientes', 'url': route('admin.faturamento.vendedores.index'), 'tag': 'clientes'},
                // {'menu': 'Produtos', 'url': route('admin.faturamento.vendedores.index'), 'tag': 'produtos'},
            ]
        },
        {
            'menu': 'Análises',
            'icone': 'fas fa-chart-pie',
            'tagMenu': 'analises',
            'submenu': [
                {'menu': 'Prazo Médio', 'url': route('admin.usuarios.vendedores.index'), 'tag': 'prazo_medio'},
                {'menu': 'M.C.', 'url': route('admin.usuarios.gerente-regional.index'), 'tag': 'mc'},
                {'menu': 'Desconto Médio', 'url': route('admin.usuarios.admins.index'), 'tag': 'desconto_medio'},
            ]
        },
        {
            'menu': 'Relatórios',
            'icone': 'fas fa-box',
            'tagMenu': 'produtos',
            'submenu': [
                {
                    'menu': 'Importar Arquivo',
                    'url': route('admin.produtos.importar.index'),
                    'tag': 'importar'
                },
            ]
        },
        {
            'menu': 'Usuários',
            'icone': 'fas fa-users',
            'tagMenu': 'usuarios',
            'submenu': [
                {'menu': 'Vendedores', 'url': route('admin.usuarios.vendedores.index'), 'tag': 'vendedores'},
                {
                    'menu': 'Gerentes Regional',
                    'url': route('admin.usuarios.gerente-regional.index'),
                    'tag': 'gerente_regional'
                },
                {'menu': 'Admins', 'url': route('admin.usuarios.admins.index'), 'tag': 'admins'},
            ]
        },
    ];

    return (
        <div className="container">
            <div className="row my-4 justify-content-center">
                <div className="col-auto">
                    <div className="bg-white p-2 rounded text-center">
                        <img src={logo} width="90%" alt="logo"/>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush w-auto mb-6" id="accordionFlushSidebar">
                {/*ITEMS*/}
                {pages.map(({menu, icone, submenu, tagMenu}, index) => (
                    <div key={index} className="accordion-item text-dark navbar-nav py-1">
                        <div className="accordion-header nav-item mb-1" id={"flush-heading-" + index}>
                            <div
                                className={(tagMenu === menuSidebar ? '' : 'collapsed ') + "accordion-button nav-link p-1 m-0 text-white"}
                                data-bs-toggle="collapse"
                                data-bs-target={"#flush-collapse-" + index} aria-expanded="false"
                                aria-controls={"flush-collapse-" + index}>
                                <div className="icon border-radius-md d-flex align-items-center">
                                    <i className={icone + " text-sm opacity-10 text-white"}></i>
                                </div>
                                <span className="ms-2">{menu}</span>
                            </div>
                        </div>

                        <div id={"flush-collapse-" + index}
                             className={(tagMenu === menuSidebar ? 'show ' : '') + "accordion-collapse nav-item collapse"}
                             aria-labelledby={"flush-heading-" + index}
                             data-bs-parent="#accordionFlushSidebar">

                            {submenu.map(({menu, url, tag}, i) => (
                                <a href={url} key={i} className="text-sm text-white">
                                    <div className="accordion-body p-0 ms-4 mb-2 ps-3">
                                        <span
                                            className={(tag === submenuSidebar && tagMenu === menuSidebar ? 'navmenu-active ' : '') + "nav-link-text"}>
                                            {menu}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                {/*ITEMS - FIM*/}
            </div>
        </div>
    )
}
