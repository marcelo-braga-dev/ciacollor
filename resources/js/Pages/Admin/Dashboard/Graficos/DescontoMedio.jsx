export default function DescontoMedio()
{
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Vendedores'],
            ['2014', 1000],
            ['2015', 1170],
            ['2016', 660],
            ['2017', 1030]
        ]);

        var options = {
            chart: {
                title: 'Desconto Médio',
            }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));


    }
    return (<></>
        // <div id="columnchart_material" style={{width: '100%'}}></div>
    )
}
