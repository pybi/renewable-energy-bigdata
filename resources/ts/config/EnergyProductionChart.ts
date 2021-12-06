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
            stacked: true,
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
        console.log('in get Data');
        return {
            labels: this.labelTimes,
            datasets: [{
                label: 'Nuclear',
                borderColor: Colors.nuclear,
                data: [],
                fill: true,
                backgroundColor: Colors.nuclear
            }, {
                data: [],
                label: "Coal",
                borderColor: Colors.coal,
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                backgroundColor: Colors.coal
            }, {
                data: [],
                label: "Gas",
                borderColor: Colors.gas,
                fill: true,
                backgroundColor: Colors.gas
            }, {
                data: [],
                label: "Wind",
                borderColor: Colors.wind,
                fill: true,
                backgroundColor: Colors.wind

            }, {
                data: [],
                label: "Solar",
                borderColor: Colors.solar,
                fill: true,
                backgroundColor: Colors.solar

            }, {
                data: [],
                label: "Biomass",
                borderColor: Colors.biomass,
                fill: true,
                backgroundColor: Colors.biomass
            }, {
                data: [],
                label: "Hydro",
                borderColor: Colors.hydro,
                fill: true,
                backgroundColor: Colors.hydro

            }, {
                label: 'Import',
                borderColor: Colors.import,
                data: [],
                fill: true,
                backgroundColor: Colors.import
            }]
        }
    }

    multiply(datasetLabel: string, factor: number) {
        console.log(this.aggregatedData[0][Utils.keyForLabel('Wind')]);
        let newMutatedData = [];
        for(let month in this.aggregatedData) {
            let newMonth = [];
            for(let set in this.aggregatedData[month]) {
                if(set == Utils.keyForLabel(datasetLabel)) {
                    newMonth[set] = this.aggregatedData[month][set].map((value) => value * factor);
                } else {
                    newMonth[set] = this.mutatedData[month][set];
                }
            }
            newMutatedData.push(newMonth);
        }
        this.mutatedData = newMutatedData;
        this.changeMonth(this.currentMonth);
    }

    getChartType(): string {
        return 'line';
    }
}