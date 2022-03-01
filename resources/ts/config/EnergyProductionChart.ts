import {EnergyChart} from "./EnergyChart";
import * as $ from 'jquery';
import Chart from "chart.js/auto";
import {Colors} from "../Colors";
import {data} from "jquery";
import {Utils} from "../Utils";
let _ = require('lodash');



export class EnergyProductionChart extends EnergyChart {
    chartType = 'line';

    constructor(ctx: JQuery<HTMLElement>, aggregatedData: Array<any>) {
        super(ctx,aggregatedData);
    }
    getXScale() {
        return {
            ticks: {
                callback: function (value, index, values) {
                    return value + "h";
                }
            },
            title: {
                text: "Time of the day",
                display: true
            }
        }
    }

    getYScale() {
        return {
            //stacked: true,
            gridLines: {
                display: false,
            },
            min: 0,
            max: 4000,
            ticks: {
                callback: function (value, index, values) {
                    return value + " MW";
                }
            },
            title: {
                text: "Produced Electricity in MW",
                display: true
            }
        }
    }

    getData(): any {
        return {
            labels: this.labelTimes,
            datasets: [{
                label: 'Nuclear',
                borderColor: Colors.nuclear,
                data: [],
                fill: true,
                backgroundColor: Colors.nuclear,
                stack: "prod",
                order: 2
            }, {
                data: [],
                label: "Coal",
                borderColor: Colors.coal,
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                backgroundColor: Colors.coal,
                stack: "prod",
                order: 2
            }, {
                data: [],
                label: "Gas",
                borderColor: Colors.gas,
                fill: true,
                backgroundColor: Colors.gas,
                stack: "prod",
                order: 2

            }, {
                data: [],
                label: "Wind",
                borderColor: Colors.wind,
                fill: true,
                backgroundColor: Colors.wind,
                stack: "prod",
                order: 2

            }, {
                data: [],
                label: "Solar",
                borderColor: Colors.solar,
                fill: true,
                backgroundColor: Colors.solar,
                stack: "prod",
                order: 2

            }, {
                data: [],
                label: "Biomass",
                borderColor: Colors.biomass,
                fill: true,
                backgroundColor: Colors.biomass,
                stack: "prod",
                order: 2

            }, {
                data: [],
                label: "Hydro",
                borderColor: Colors.hydro,
                fill: true,
                backgroundColor: Colors.hydro,
                stack: "prod",
                order: 2

            }, {
                label: 'Import',
                borderColor: Colors.import,
                data: [],
                fill: true,
                backgroundColor: Colors.import,
                stack: "prod",
                order: 2
            }, {
                label: 'Consumption',
                data: [],
                borderColor: Colors.consumption,
                order: 1
            }]
        }
    }

    getChartType(): string {
        return 'line';
    }

    changeMonth(month: number) {
        this.currentMonth = month;
        this.chart.data.datasets = this.chart.data.datasets.map((dataset) => {
            let labelKey = Utils.keyForLabel(dataset.label);
            dataset.data = EnergyChart.mutatedData[month - 1][labelKey];
            return dataset;
        });
        console.log("OOOOO");
        console.log(this.chart.data);
        this.getTotalEnergyValues(this.chart.data.datasets);

        this.chart.update();
    }


    getTotalEnergyValues(chartDataset){
        var totalProduction = 0;
        var totalConsumption = 0;

        chartDataset.forEach(element => {
            if(element.label != "Consumption"){
                element.data.forEach(hours => {
                    totalProduction += hours;
                });
            } else {
                element.data.forEach(consumptionVals => {
                    totalConsumption += consumptionVals;
                });
            }
        });

        var percentage = Math.round((100 * totalProduction) / totalConsumption);
        $('#mapUnderlayColor').height(percentage+"%");
        $('#prozentEnergie').html(percentage+"%");
    }
}