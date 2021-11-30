import * as $ from 'jquery';
import Chart from 'chart.js/auto';
let _ = require('lodash');
import {data} from "jquery";

const rawData = [
    require('../data/EnergyData-2021-1.json'),
    require('../data/EnergyData-2021-2.json'),
    require('../data/EnergyData-2021-3.json'),
    require('../data/EnergyData-2021-4.json'),
    require('../data/EnergyData-2021-5.json'),
    require('../data/EnergyData-2021-6.json'),
    require('../data/EnergyData-2021-7.json'),
    require('../data/EnergyData-2021-8.json'),
    require('../data/EnergyData-2021-9.json'),
    require('../data/EnergyData-2021-10.json')
]


$(() => {
    new Main();
});


export class Main {

    mainChart: Chart = null;
    aggregatedData = null;


    currentMonth = 1;
    dataSets = {
        solarData: [400675, 357375, 314525, 28285, 260875, 2541, 238375, 2490, 2429, 241825, 22465, 204725, 20575, 2096, 229375, 305625, 379025, 4397, 48415, 5026, 520225, 567675, 532825],
        windData: [400675, 357375, 314525, 28285, 260875, 2541, 238375, 2490, 2429, 241825, 22465, 204725, 20575, 2096, 229375, 305625, 379025, 4397, 48415, 5026, 520225, 567675, 532825],
        biomassData: [50865, 50775, 5061, 504525, 5064, 50645, 50635, 50805, 5076, 511125, 510475, 510775, 511475, 513625, 5143, 515625, 51485, 51405, 513675, 516975, 5175, 51615, 514225],
        hydroData: [119625, 1164, 117925, 1155, 11455, 11605, 11575, 115225, 11635, 115875, 115975, 116975, 117125, 116625, 1168, 119425, 120975, 120425, 11815, 119775, 12235, 1228, 122275],
        coalData: [146475, 1482575, 15190, 1510825, 15436, 158875, 154245, 15523, 152545, 146655, 143015, 1405675, 1402525, 13931, 143045, 14572, 1509425, 1504625, 1509325, 1488525, 14443, 1421875, 1392375],
        gasData: [5409, 5312, 5127, 4993, 50575, 5094, 516925, 556925, 60525, 65155, 714425, 74455, 74115, 758675, 79345, 83475, 838875, 846475, 847875, 841225, 84095, 810275, 72475],
        nuclearData: [815025, 81565, 815375, 81505, 815025, 81545, 815275, 81575, 8160, 816125, 816025, 8153, 81535, 815475, 815675, 8156, 8151, 815075, 815475, 815225, 814875, 8141, 814175],
    };

    colors = {
        wind: "#4ba3c3",
        solar: "#ffb703",
        biomass: "#397367",
        hydro: "#00b5cf",
        coal: "#36311f",
        gas: "#d6e5e3",
        nuclear: "#7cdf64"
    };

    labelTimes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];


    constructor() {
        this.loadData();
        this.showGraph();
        this.changeMonth(1);
        this.setupEventListeners();
    }

    private loadData() {
        this.aggregatedData = this.aggregateMonths();
    }

    private setupEventListeners() {
        $('.month-radio').on('change', (e, v) => {

            this.changeMonth(Number($(e.target).val()));
        });
    }
    private showGraph() {

        let data = {
            labels: this.labelTimes,
            datasets: [{
                data: [],
                label: "Coal",
                borderColor: this.colors.coal,
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                backgroundColor: this.colors.coal
            }, {
                data: [],
                label: "Gas",
                borderColor: this.colors.gas,
                fill: true,
                backgroundColor: this.colors.gas
            }, {
                data: [],
                label: "Wind",
                borderColor: this.colors.wind,
                fill: true,
                backgroundColor: this.colors.wind

            }, {
                data: [],
                label: "Solar",
                borderColor: this.colors.solar,
                fill: true,
                backgroundColor: this.colors.solar

            }, {
                data: [],
                label: "Biomass",
                borderColor: this.colors.biomass,
                fill: true,
                backgroundColor: this.colors.biomass

            }, {
                data: [],
                label: "Hydro",
                borderColor: this.colors.hydro,
                fill: true,
                backgroundColor: this.colors.hydro

            }, {
                label: 'Nuclear',
                borderColor: this.colors.nuclear,
                data: [],
                fill: true,
                backgroundColor: this.colors.nuclear
            }
            ]
        };
        let ctx = $('#energyProductionLine');
        //@ts-ignore
        this.mainChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {

                title: {
                    display: true,
                    text: 'Enery Production by Sector'
                },
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        mode: 'x'
                    },
                },
                interaction: {
                    intersect: true,
                },
                scales: {
                    y: {
                        stacked: true,
                        gridLines: {
                            display: false,
                        },
                        suggestedMin: -10,
                        suggestedMax: 200
                    },
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: { position: 'bottom' }
        });
    }

    private showCharts() {

    }

    /*
     * Calculate the average value per hour per category by month
     */
    private aggregateMonths(): Array<Array<Array<Number>>>{
        let aggregatedData = [];
        for (let month of rawData) {
            const monthLength = _.size(month);
            let monthData: Array<any> = [];
            for (let day in month) {
                for (let category in month[day]) {
                    monthData[category] = [];
                    for (let hour in month[day][category]) {
                        if (monthData[category][hour]) {
                            monthData[category][hour] += month[day][category][hour]/monthLength;
                        } else {
                            monthData[category][hour] = month[day][category][hour]/monthLength;
                        }
                    }
                }
            }
            aggregatedData.push(monthData);
        }
        return aggregatedData;
    }

    private changeMonth(month: number) {
        console.log(month);
       this.mainChart.data.datasets = this.mainChart.data.datasets.map((dataset) => {
           let labelKey = null;
           switch (dataset.label) {
               case 'Coal': labelKey = 'power_production_coal_avg'; break;
               case 'Gas': labelKey = 'power_production_gas_avg'; break;
               case 'Wind': labelKey = 'power_production_wind_avg'; break;
               case 'Solar': labelKey = 'power_production_solar_avg'; break;
               case 'Biomass': labelKey = 'power_production_biomass_avg'; break;
               case 'Hydro': labelKey = 'power_production_hydro_avg'; break;
               case 'Nuclear': labelKey = 'power_production_nuclear_avg'; break;
               default: console.log('Oho ein Fehler');
           }
           dataset.data = this.aggregatedData[month - 1][labelKey];
           return dataset;
        });
       this.mainChart.update();
    }
}
