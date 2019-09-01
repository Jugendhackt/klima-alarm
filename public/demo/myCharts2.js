var lineCtx = document.getElementById('lineChart').getContext('2d');
var pieCtx = document.getElementById('pieChart').getContext('2d');

var data = {
    co2: [],
    airQuality: []
}

var pieConfig = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [1,3],
            backgroundColor: [
                window.chartColors.grey,
                window.chartColors.yellow,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            'CO2',
            'Luftqualität',
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            // text: 'Chart.js Doughnut Chart'
            text: 'Donutdiagramm 😋 - Luftverschmutzung Anteil'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

var lineConfig = {
    type: 'line',
    data: {
        labels: [
        ],
        datasets: [
            {
                label: 'CO2',
                backgroundColor: "rgba(201, 203, 207, 0.5)",
                borderColor: chartColors.grey,
                data: []
            },
            {
                label: ' Methan',
                backgroundColor: "rgba(255, 205, 86, 0.5)",
                borderColor: chartColors.yellow,
                data: []
            }
        ]
    },
	options: {
        title: {
            // text: 'Chart.js Time Scale'
            text: 'Liniendiagramm - Luftverschmutzung über Zeit'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Zeit',
                },
                ticks: {
                    autoSkipPadding: 50
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'parts per million (ppm)'
                }
            }]
        },
    }
};


var lineChart = new Chart(lineCtx, lineConfig);
var pieChart = new Chart(pieCtx, pieConfig);


function reset() {
    data.co2 = [];
    data.air = []
}

var step = 0;
setInterval(()=>{

    data.co2.push(Math.random()*12);
    data.methan.push(data.methan, Math.random()*12);
    
    lineConfig.data.labels.push(step*3+ " Sek");
    lineConfig.data.datasets[0].data.push(data.co2[data.co2.length-1]);
    lineConfig.data.datasets[1].data.push(data.methan[data.methan.length-1]);
    
    pieConfig.data.datasets[0].data[0] = data.co2[data.co2.length-1]
    pieConfig.data.datasets[0].data[1] = data.methan[data.methan.length-1]

    step++;
    
    lineChart.update();
    pieChart.update();
}, 3000);