


class Chart {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Spendings (in $)',
            data: [],
            backgroundColor: ['rgb(236, 119, 95)'],
            borderRadius: 6,
        }]
    },
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
});
}