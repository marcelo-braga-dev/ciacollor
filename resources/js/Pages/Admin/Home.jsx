import Layout from "@/Layouts/Admin/Layout";
import DescontoMedio from "@/Pages/Admin/Dashboard/Graficos/DescontoMedio";
import MediaMC from "@/Pages/Admin/Dashboard/Graficos/MediaMC";

export default function Dashboard(props) {

    return (
        <Layout titlePage="Dashboard" menu="dashboard" submenu="relatorios">
            <div className="mx-auto">
                <div className="bg-white rounded overflow-hidden shadow-sm p-4">
                    <div className="row">
                        <div className="col-md-6">
                            <DescontoMedio />
                        </div>
                        <div className="col-md-6">
                            <MediaMC />
                        </div>
                    </div>

                    <div className="p-4">Dashboard</div>
                </div>
            </div>
        </Layout>
    );
}
