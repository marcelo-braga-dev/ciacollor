export default function DescontoMedio()
{
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Média MC', '%'],
            ['Nome 1', 30],
            ['Nome 2', 10],
            ['Nome 3', 11],
            ['Nome 4', 6],
            ['Nome 5', 14]
        ]);

        var options = {
            chart: {
                title: 'Média MC',
            },
            legend: {position: 'none'},
            alignment: 'end'
        };

        var chart = new google.charts.Bar(document.getElementById('media_mc'));

        chart.draw(data, google.charts.Bar.convertOptions(options));


    }
    return (
        <div id="media_mc" style={{width: '100%', height: 350}}></div>
    )
}
