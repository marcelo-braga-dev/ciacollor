export default function DescontoMedio()
{
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Prazo Médio', '%'],
            ['Nome 1', 30],
            ['Nome 2', 10],
            ['Nome 3', 11],
            ['Nome 4', 6],
            ['Nome 5', 14]
        ]);

        var options = {
            chart: {
                title: 'Prazo Médio',
            },
            legend: {position: 'none'},
            alignment: 'end'
        };

        var chart = new google.charts.Bar(document.getElementById('prazo_medio'));

        chart.draw(data, google.charts.Bar.convertOptions(options));


    }
    return (
        <div id="prazo_medio" style={{width: '100%', height: 350}}></div>
    )
}
