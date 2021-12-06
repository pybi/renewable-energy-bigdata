import Chart from "chart.js/auto";
import * as $ from 'jquery';
import {Utils} from "../Utils";


export abstract class EnergyChart {

    labelTimes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    currentMonth: number = 1;
    aggregatedData = [];
    mutatedData = [];
    chart: Chart = null;
    titleText = '';
    constructor(ctx: JQuery<HTMLElement>, aggregatedData: Array<any>) {
        this.aggregatedData = aggregatedData;
        this.mutatedData = aggregatedData;
        //@ts-ignore
        this.chart = new Chart(ctx, this.getConfig());
    }

    abstract getChartType(): string;

    abstract getData();

    abstract getXScale();

    abstract getYScale();

    abstract multiply(datasetLabel, factor);

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

    changeMonth(month: number) {
        this.currentMonth = month;
        this.chart.data.datasets = this.chart.data.datasets.map((dataset) => {
            let labelKey = Utils.keyForLabel(dataset.label);
            dataset.data = this.mutatedData[month - 1][labelKey];
            return dataset;
        });
        this.chart.update();
    }

}