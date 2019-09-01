var socket;

var chartsElem = {
    final: {
        line: $('#lineChartFinal'),
        pie: $('#pieChartFinal'),
    },
    demo: {
        line: $('#lineChartDemo'),
        pie: $('#pieChartDemo')
    }
}

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
            // display: true,
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
                label: 'Luftverschmutzung',
                backgroundColor: "rgba(255, 205, 86, 0.5)",
                borderColor: chartColors.yellow,
                data: []
            }
        ]
    },
	options: {
        title: {
            // text: 'Chart.js Time Scale'
            // display: true,
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


var chartsObj = {
    final: {
        line: new Chart( chartsElem.final.line, lineConfig ),
        pie: new Chart( chartsElem.final.pie, pieConfig )
    },
    demo: {
        line: new Chart( chartsElem.demo.line, lineConfig ),
        pie: new Chart( chartsElem.demo.pie, pieConfig )
    }
}


var showFinal = false;

function demo() {
    showFinal = false;
    reset();

    $('#demo-chart-btn').addClass('active');
    $('#demo-chart-btn > .spinner-grow').show();

    $('#final-chart-btn').removeClass('active');
    $('#final-chart-btn > .spinner-grow').hide();
    

    demoValues = createDemoValues();
}


function final() {
    reset();

    $('#final-chart-btn > .spinner-grow').show();
    $('#demo-chart-btn > .spinner-grow').hide();

    showFinal = true;
    
    socket = io();

    socket.on('sensor', function(msg){
        console.log(msg);

        if( showFinal ) {
            
            if( msg.includes('Co2: ') ) {
                
                var value = msg.split('Co2: ')[1]*1;
                chartsObj.final.line.config.data.datasets[0].data.push( value );
                chartsObj.demo.pie.config.data.datasets[0].data[0] = value;
                console.log('Co2: ', value);
                
            }
            
            else if( msg.includes('LABR: ') ) {
                
                var value = msg.split('LABR: ')[1]*1;
                chartsObj.final.line.config.data.datasets[0].data.push( value );
                chartsObj.demo.pie.config.data.datasets[0].data[0] = value;
                console.log('LABR:', value);
            }
            
            var label = ~~(performance.now()/1000) + " Sek";
            chartsObj.demo.pie.config.data.labels.push(label)
            chartsObj.demo.line.config.data.labels.push(label)
            
            updateCharts();
        }
    });
}

function reset() {

    clearInterval(demoValues);

    data.co2 = [];
    data.airQuality = [];

    lineConfig.data.labels = [];
    lineConfig.data.datasets[0].data = [];
    lineConfig.data.datasets[1].data = [];

    pieConfig.data.datasets[0].data[0] = [];
    pieConfig.data.datasets[0].data[1] = [];

    step = 0;


    updateCharts();
}

var step = 0;
var demoValues;

var createDemoValues = () => setInterval(()=>{
    
    chartsObj.demo.line.config.data.datasets[0].data.push( Math.random()*12 );
    chartsObj.demo.line.config.data.datasets[1].data.push( Math.random()*12 );

    chartsObj.demo.pie.config.data.datasets[0].data[0] = Math.random()*12;
    chartsObj.demo.pie.config.data.datasets[0].data[1] = Math.random()*12;

    chartsObj.demo.pie.config.data.labels.push(step*3+ " Sek")
    chartsObj.demo.line.config.data.labels.push(step*3+ " Sek")
    
    updateCharts();

    step++;
    
}, 3000);


function updateCharts() {

    chartsObj.final.line.update()
    chartsObj.final.pie.update()
    chartsObj.demo.line.update()
    chartsObj.demo.pie.update()

}



demo();