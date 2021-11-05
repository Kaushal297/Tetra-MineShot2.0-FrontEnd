// Custom Checkbox
let CMSTableParentDiv = document.getElementsByClassName('CMSTable')

for(let i=0;i<CMSTableParentDiv.length;i++){
    let CMSTableChildrenDivs = CMSTableParentDiv[i].children,
        CMSTableChildContainer = CMSTableChildrenDivs[CMSTableChildrenDivs.length-1],
        AddSvg = CMSTableChildrenDivs[0].children[1];
        
    AddSvg.addEventListener('click',()=> {
        if(CMSTableChildContainer.classList.contains('hide')){
            CMSTableChildContainer.classList.remove('hide');
        }else{
            CMSTableChildContainer.classList.add('hide');
        }
    })
}

// Meter gauge ------------------------------------------------------------------------------------
// Backend: graphdataArray data will come from backend. make sure the values you send is in the same format of data.
const graphdataArray = {
    data: [[15000, 7000, 7000],[20000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000]],
    needleValue: [19309,25000,13309,3656,25977,8128,7,1]
}

//   gaugeNeedle block (Do not Change this block of code)
const gaugeNeedle = {
    id: 'gaugeNeedle',
    afterDatasetDraw(chart, args, options) {
        const { ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart;
        
        ctx.save();
        const needleValue = data.datasets[0].needleValue
        const dataTotal = data.datasets[0].data.reduce((a,b) => a+b, 0)
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI)
        const cx = width / 2
        const cy = chart._metasets[0].data[0].y
        const firstValue = 'OBR (Cu m)'
        // Needle
        ctx.translate(cx,cy)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -2)
        ctx.lineTo(height / 2 , 0)
        ctx.lineTo(0, 2)
        ctx.fillStyle = '#000'
        ctx.fill()
        
        // Needle Dot
        ctx.translate(-cx,-cy)
        ctx.beginPath();
        ctx.arc(cx,cy,5,0,10);
        ctx.fill();
        ctx.restore();
        
        // Needle below Text
        ctx.font = '16px Adani-Regular'
        ctx.fillStyle = '#0000007d'
        ctx.fillText(needleValue, cx, cy +20);
        ctx.textAlign = 'center'
        ctx.restore()
    }
}

// Configuration of meter guage
let congifDataArray = [];
for(let i=0;i<8;i++){
    congifDataArray.push({
        type: 'doughnut',
        data: {
            datasets: [{
                data: graphdataArray.data[i],
                backgroundColor: [
                    'rgb(191, 80, 78)',
                    'rgb(155, 187, 88)',
                    'rgb(129, 100, 163)'
                ],
                needleValue: graphdataArray.needleValue[i],
                hoverOffset: 4,
                cutout: '80%',
                circumference:180,
                rotation: 270
            }]
        },
        options: {
            plugins:{
                legend:{
                    display: false
                }
            },
            responsive: true,
        },
        plugins: [gaugeNeedle]
    })
}

// Initialized the charts meter guage
const OBR = new Chart(document.getElementById('MeterGauge1'),congifDataArray[0]),
    ROM = new Chart(document.getElementById('MeterGauge2'),congifDataArray[1]),
    ProcessingWC = new Chart(document.getElementById('MeterGauge3'),congifDataArray[2]),
    ProcessingRC = new Chart(document.getElementById('MeterGauge4'),congifDataArray[3]),
    DispatchWC = new Chart(document.getElementById('MeterGauge5'),congifDataArray[4]),
    DispatchRC = new Chart(document.getElementById('MeterGauge6'),congifDataArray[5]),
    RakesWC = new Chart(document.getElementById('MeterGauge7'),congifDataArray[6]),
    RakesRC = new Chart(document.getElementById('MeterGauge8'),congifDataArray[7])
// ----------------------------------------------------------------------------------------------------

// line graph : OB Removal, Coal Extraction & Yield
// config for OB Removal, Coal Extraction
const config = {
    type: 'line',
    data:  {
        labels: ['21-10-2021', '22-10-2021', '23-10-2021', '24-10-2021', '25-10-2021', '26-10-2021'],
        datasets: [{
            data: [10000,10100,10010,10001,10101,10111],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                ticks: {
                    maxRotation: 70,
                    minRotation: 70
                }
            }
        },
        plugins:{
            legend:{
                display: false
            },
            responsive: true,
        }
    }
};

// config for Yield
const mixconfig = {
    data: {
        datasets: [{
            type: 'line',
            label: 'Yield',
            data: [55,52,53,54,55],
            borderColor: '#00B050',
            pointBorderColor: '#00B050',
            pointBackgroundColor: "transparent",
            backgroundColor: "#00B050"
        }, {
            type: 'line',
            label: 'Planned Yield',
            data: [50, 50, 50, 50,50],
            borderDash: [10,5],
            borderColor: '#215968',
            pointBorderColor: '#215968',
            pointBackgroundColor: "transparent",
            backgroundColor: "#ffffff",
        }],
        labels: ['22-10-2021', '23-10-2021', '24-10-2021', '25-10-2021', '26-10-2021']
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                ticks: {
                    maxRotation: 70,
                    minRotation: 70
                }
            }
        },
        responsive: true,   
    }
};

const ObRemoval = new Chart(document.getElementById('ObRemoval'),config);
const CoalExtraction = new Chart(document.getElementById('CoalExtraction'),config)
const Yield = new Chart(document.getElementById('Yield'),mixconfig)

// Bar Graph for plan vs actual MTD
const StackedDataArray = {
    legend: [['Planned'],['Actual']],
    // this data need to be entered in total
    data: [[600,500,450,600],[500,570,400,530]],
    color: [['#FF7A00'],['#AF0000']],
    labels: ['Coal Extraction','WC Production','Reject Production','WC Dispatch']
}

const BarConfig = {
    type: 'bar',
    data: {
        labels: StackedDataArray.labels,
        datasets: [{
          label: StackedDataArray.legend[0],
          data: StackedDataArray.data[0],
          backgroundColor: StackedDataArray.color[0],
        },{
          label: StackedDataArray.legend[1],
          data: StackedDataArray.data[1],
          backgroundColor: StackedDataArray.color[1],
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        },
        x: {
            ticks: {
                    maxRotation: 40,
                    minRotation: 40
                }
            }
        },
        responsive: true,
        
    },
};
// -------------------------------------------

const StockDataArray = {
    legend: [['Washed Coal'],['Washery Reject']],
    // this data need to be entered in total
    data: [[500000,500,450,600],[1500000,570,400,530]],
    color: [['#002060'],['#00B050']],
    labels: ['01-Nov-2021']
}

const StockConfig = {
    type: 'bar',
    data: {
        labels: StockDataArray.labels,
        datasets: [{
          label: StockDataArray.legend[0],
          data: StockDataArray.data[0],
          backgroundColor: StockDataArray.color[0],
          stack: 0
        },{
          label: StockDataArray.legend[1],
          data: StockDataArray.data[1],
          backgroundColor: StockDataArray.color[1],
          stack: 0
        },{
            label: StockDataArray.legend[0],
            data: StockDataArray.data[0],
            backgroundColor: StockDataArray.color[0],
            stack: 1
          },{
            label: StockDataArray.legend[1],
            data: StockDataArray.data[1],
            backgroundColor: StockDataArray.color[1],
            stack: 1
          },{
            label: StockDataArray.legend[0],
            data: StockDataArray.data[0],
            backgroundColor: StockDataArray.color[0],
            stack: 2
          },{
            label: StockDataArray.legend[1],
            data: StockDataArray.data[1],
            backgroundColor: StockDataArray.color[1],
            stack: 2
          }]
    },
    options: {
        indexAxis: 'y',
        barPercentage: 0.2,
        categoryPercentage: 0.2,
        scales: {
        y: {
            beginAtZero: true,
            stacked: true,
        },
        x: {
            stacked: true,
            ticks: {
                    maxRotation: 40,
                    minRotation: 40
                }
            }
        },
        responsive: true,
        intersection: {
            intersect: false
        }
    },
};

const PlanVsActualMTD = new Chart(document.getElementById('Plan'),BarConfig);
const Stock = new Chart(document.getElementById('Stock'),StockConfig);