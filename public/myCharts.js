// var timeFormat = 'MM/DD/YYYY HH:mm';
var timeFormat = 'HH:mm:ss,ms';
// var timeFormat = 'LTS';

var ctx = document.getElementById('lineChart').getContext('2d');
// var ctx2 = document.getElementById('timeMethan').getContext('2d');

// var lineChartOption = ""

var data = {
    co2: [],
    methan: []
}

var config = {
    type: 'line',
    data: {
        labels: [
        ],
        datasets: [
            {
                label: 'CO2',
                // fill: false,
                // backgroundColor: chartColors.grey,
                backgroundColor: "rgba(201, 203, 207, 0.1)",
                borderColor: chartColors.grey,
                data: []
            },
            {
                label: ' Methan',
                // fill: false,
                // backgroundColor: chartColors.yellow,
                backgroundColor: "rgba(255, 205, 86, 0.1)",
                borderColor: chartColors.yellow,
                data: []
            }
        ]
    },
	options: {
        title: {
            text: 'Chart.js Time Scale'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date',
                },
                ticks: {
                    autoSkipPadding: 50
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        },
    }
};



var myChart = (elem) => new Chart(elem, );

// myChart(ctx);
// myChart(ctx2);
var CO2 = new Chart(ctx, config);
// new Chart(ctx2, config);

var step = 0;
setInterval(()=>{
    var time = performance.now()
    var timeStr = `${~~(time/1000)}:${~~(time%1000)}`;
    config.data.labels.push(step*3+ " Sek");
    // config.data.labels.push(performance.now());
    // config.data.labels.push(newDate());

    config.data.datasets[0].data.push(Math.random()*12);
    config.data.datasets[1].data.push(Math.random()*12);

    step++;
    CO2.update();
}, 3000);