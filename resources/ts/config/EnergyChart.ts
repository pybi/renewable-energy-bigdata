import Chart from "chart.js/auto";
import * as $ from 'jquery';
import {Utils} from "../Utils";


export abstract class EnergyChart {

    labelTimes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    currentMonth: number = 1;
    static aggregatedData = [];
    static mutatedData: Array<any> = [];
    chart: Chart = null;
    titleText = '';
    $ctx = null;
    constructor(ctx: JQuery<HTMLElement>, aggregatedData: Array<any>) {
        EnergyChart.aggregatedData = aggregatedData;
        EnergyChart.mutatedData = aggregatedData;
        this.$ctx = ctx;
        if (this.getChartType() != 'table') {
            //@ts-ignore
            this.chart = new Chart(ctx, this.getConfig());
        } else {
            this.customChart();
        }
    }

    customChart() {};

    static getMaxFor(column: string) {
        let max = 0;
        this.aggregatedData.forEach((month, index) => {
            month[column].forEach((element) => {
                max = element > max ? element : max;
            })
        });
        console.log(max);
        return max;
    }

    // private getTotal() {
    //     let value = EnergyChart.mutatedData;
    //     console.log("FINAL VALUE");
    //     console.log(value);
    // }

    // private updateTotal() {
    //     let value = EnergyChart.mutatedData;
    //     console.log("FINAL VALUE");
    //     console.log(value);
    // }

    abstract getChartType(): string;

    abstract getData();

    abstract getXScale();

    abstract getYScale();

    private getOptions() {
        return {
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: 'x'
                },
            },
            interaction: {
                intersect: true,
            },
            plugins: {
                title: {
                    display: true,
                    text: this.titleText
                }
            },
            scales: {
                y: this.getYScale(),
                x: this.getXScale()
            }
        }
    }

    getConfig() {
        return {
            type: this.getChartType(),
            data: this.getData(),
            options: this.getOptions(),
            responsive: true,
            maintainAspectRatio: false,
            legend: { position: 'bottom' }
         }
    }

    abstract changeMonth(month: number): void;

    multiply(datasetLabel: string, factor: number) {
        let newMutatedData = [];
        for(let month in EnergyChart.aggregatedData) {
            let newMonth = [];
            for(let set in EnergyChart.aggregatedData[month]) {
                if(set == Utils.keyForLabel(datasetLabel)) {
                    newMonth[set] = EnergyChart.aggregatedData[month][set].map((value) => value * factor);
                } else {
                    newMonth[set] = EnergyChart.mutatedData[month][set];
                }
            }
            newMutatedData.push(newMonth);
        }
        EnergyChart.mutatedData = newMutatedData;
        this.changeMonth(this.currentMonth);
    }
}