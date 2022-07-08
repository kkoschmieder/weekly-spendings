//Variables
let array = [];
var currentDate = new Date();
var weekdays = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
];
const ctx = document.getElementById('chart');
let myBalance = document.getElementById('mybalance');
let summary = document.getElementById('summary');
let lastMonthSpendings = 200;
let summaryPercentage = document.getElementById('percentage');

//Reading local JSON file

const fetchJSON = async() => {
    const response = await fetch('data.json'),
        keyValues = await response.json()
    return keyValues;
}

fetchJSON().then(keyValues => {
    let today = currentDate.getDay();
    myBalance.innerHTML = keyValues[0].balance + '$';
    let sumSpendings = 0;
    let sign = '';

    const dynamicLabel = [];
    const dynamicData = [];
    
    for (let i = 0; i < keyValues.length; i++) {
        dynamicLabel[i] = keyValues[i].day;
        dynamicData[i] = keyValues[i].amount;
    }

    dynamicData.forEach(el => {
        sumSpendings+=el;
    });

    summary.innerHTML = sumSpendings + '$';
    if (sumSpendings > lastMonthSpendings) sign='+';
    summaryPercentage.innerHTML = sign + (((sumSpendings*100) / lastMonthSpendings)-100).toPrecision(3) + '%';

    const chartData = {
        labels: dynamicLabel,
        datasets: [{
            label: 'Spendings (in $)',
            backgroundColor: color => {
                let bgColor = color.index == (today-1) ? 'rgb(118, 181, 188)' : 'rgb(236, 119, 95)';
                return bgColor;
            },
            borderRadius: 6,
            data: dynamicData
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {

                    beginAtZero: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    },
                },
            }
        },
    };

    const chart = new Chart(ctx, config);

});