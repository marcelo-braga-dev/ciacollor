export default function MediaMC()
{
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        const data = google.visualization.arrayToDataTable([
            ['Task', 'Média M.C.'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7]
        ]);

        const options = {
            title: 'Média M.C.',
            is3D: false,
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }

    return (<></>
        // <div id="piechart_3d" style={{width: '100%'}}></div>
    )
}
