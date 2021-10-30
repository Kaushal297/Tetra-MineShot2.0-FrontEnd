// Meter gauge ------------------------------------------------------------------------------------
// Backend: graphdataArray data will come from backend. make sure the values you send is in the same format of data.
const graphdataArray = {
    data: [[15000, 7000, 7000],[20000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000],[15000, 7000, 7000]],
    needleValue: [19309,25000,13309,3656,25977,8128,7,1]
}
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
        options: {},
        plugins: [gaugeNeedle]
    })
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

// Initialized the charts meter guage
const OBR = new Chart(document.getElementById('MeterGauge1'),congifDataArray[0]);
const ROM = new Chart(document.getElementById('MeterGauge2'),congifDataArray[1]);
const ProcessingWC = new Chart(document.getElementById('MeterGauge3'),congifDataArray[2]);
const ProcessingRC = new Chart(document.getElementById('MeterGauge4'),congifDataArray[3]);
const DispatchWC = new Chart(document.getElementById('MeterGauge5'),congifDataArray[4]);
const DispatchRC = new Chart(document.getElementById('MeterGauge6'),congifDataArray[5]);
const RakesWC = new Chart(document.getElementById('MeterGauge7'),congifDataArray[6]);
const RakesRC = new Chart(document.getElementById('MeterGauge8'),congifDataArray[7]);
// ----------------------------------------------------------------------------------------------------