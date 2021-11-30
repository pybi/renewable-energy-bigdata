

const dataSets = {
  solarData: [0, 0, 0, 0, 0, 0, 25, 194, 136375, 29865, 42375, 482675, 423425, 2725, 94475, 4375, 0, 0, 0, 0, 0, 0, 0],
  windData: [400675, 357375, 314525, 28285, 260875, 2541, 238375, 2490, 2429, 241825, 22465, 204725, 20575, 2096, 229375, 305625, 379025, 4397, 48415, 5026, 520225, 567675, 532825],
  biomassData: [50865, 50775, 5061, 504525, 5064, 50645, 50635, 50805, 5076, 511125, 510475, 510775, 511475, 513625, 5143, 515625, 51485, 51405, 513675, 516975, 5175, 51615, 514225],
  hydroData: [119625, 1164, 117925, 1155, 11455, 11605, 11575, 115225, 11635, 115875, 115975, 116975, 117125, 116625, 1168, 119425, 120975, 120425, 11815, 119775, 12235, 1228, 122275],
  coalData: [146475, 1482575, 15190, 1510825, 15436, 158875, 154245, 15523, 152545, 146655, 143015, 1405675, 1402525, 13931, 143045, 14572, 1509425, 1504625, 1509325, 1488525, 14443, 1421875, 1392375],
  gasData: [5409, 5312, 5127, 4993, 50575, 5094, 516925, 556925, 60525, 65155, 714425, 74455, 74115, 758675, 79345, 83475, 838875, 846475, 847875, 841225, 84095, 810275, 72475],
  nuclearData: [815025, 81565, 815375, 81505, 815025, 81545, 815275, 81575, 8160, 816125, 816025, 8153, 81535, 815475, 815675, 8156, 8151, 815075, 815475, 815225, 814875, 8141, 814175],
}

const colors = {
  wind: "#4ba3c3",
  solar: "#ffb703",
  biomass: "#397367",
  hydro: "#00b5cf",
  coal: "#36311f",
  gas: "#d6e5e3",
  nuclear: "#7cdf64"
}

const labelTimes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

new Chart(document.getElementById("energyProductionLine"), {
  type: 'line',
  data: {
    labels: labelTimes,
    datasets: [{
        data: dataSets.coalData,
        label: "Coal",
        borderColor: colors.coal,
        fill: false
      }, {
        data: dataSets.gasData,
        label: "Gas",
        borderColor: colors.gas,
        fill: false
      }, {
        data: dataSets.windData,
        label: "Wind",
        borderColor: colors.wind,
        fill: false
      }, {
        data: dataSets.solarData,
        label: "Solar",
        borderColor: colors.solar,
        fill: false
      }, {
        data: dataSets.biomassData,
        label: "Biomass",
        borderColor: colors.biomass,
        fill: false
      }, {
        data: dataSets.hydroData,
        label: "Hydro",
        borderColor: colors.hydro,
        fill: false
      }, {
        label: 'Nuclear',
        borderColor: colors.nuclear,
        data: dataSets.nuclearData,
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    legend: { position: 'bottom' },
  }
});


new Chart(document.getElementById("energyProductionLineStacked"), {
  type: 'line',
  data: {
    labels: labelTimes,
    datasets: [{
        data: dataSets.coalData,
        label: "Coal",
        borderColor: colors.coal,
        fill: false
      }, {
        data: dataSets.gasData,
        label: "Gas",
        borderColor: colors.gas,
        fill: false
      }, {
        data: dataSets.windData,
        label: "Wind",
        borderColor: colors.wind,
        fill: false
      }, {
        data: dataSets.solarData,
        label: "Solar",
        borderColor: colors.solar,
        fill: false
      }, {
        data: dataSets.biomassData,
        label: "Biomass",
        borderColor: colors.biomass,
        fill: false
      }, {
        data: dataSets.hydroData,
        label: "Hydro",
        borderColor: colors.hydro,
        fill: false
      }, {
        label: 'Nuclear',
        borderColor: colors.nuclear,
        data: dataSets.nuclearData,
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    scales: {
      yAxes: [{
        stacked: true,
      }]
    },
    legend: { position: 'bottom' },
  }
});


new Chart(document.getElementById("energyProductionBar"), {
  type: 'bar',
  data: {
    labels: labelTimes,
    datasets: [{
      label: 'Wind',
      backgroundColor: colors.wind,
      data: dataSets.windData,
      stack: 'renewable',
    }, {
      label: 'Solar',
      backgroundColor: colors.solar,
      data: dataSets.solarData,
      stack: 'renewable',
    }, {
      label: 'Biomass',
      backgroundColor: colors.biomass,
      data: dataSets.biomassData,
      stack: 'renewable',
    }, {
      label: 'Hydro',
      backgroundColor: colors.hydro,
      data: dataSets.hydroData,
      stack: 'renewable',
    }, {
      label: 'Nuclear',
      backgroundColor: colors.nuclear,
      data: dataSets.nuclearData,
      stack: 'renewable',
    }, {
      label: 'Coal',
      backgroundColor: colors.coal,
      data: dataSets.coalData,
      stack: 'fossil',
    }, {
      label: 'Gas',
      backgroundColor: colors.gas,
      data: dataSets.gasData,
      stack: 'fossil',
    }],
  },
  options: {
    title: {
      display: true,
      text: 'Energy Production by Sector'
    },
    tooltips: {
      displayColors: true,
      callbacks:{
        mode: 'x',
      },
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: 'linear',
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
  }
});
