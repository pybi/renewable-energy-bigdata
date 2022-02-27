    import * as $ from 'jquery';
import Chart from 'chart.js/auto';
let _ = require('lodash');
import {data} from "jquery";
import {EnergyProductionChart} from "./config/EnergyProductionChart";
import {DataService} from "./DataService";
import {EnergyChart} from "./config/EnergyChart";
import {Utils} from "./Utils";
    import {EnergyTableChart} from "./config/EnergyTableChart";



$(() => {
    new Main();
});


export class Main {
    rawData: Array<Array<any>> = [
        require('../data/EnergyData-2021-1.json'),
        require('../data/EnergyData-2021-2.json'),
        require('../data/EnergyData-2021-3.json'),
        require('../data/EnergyData-2021-4.json'),
        require('../data/EnergyData-2021-5.json'),
        require('../data/EnergyData-2021-6.json'),
        require('../data/EnergyData-2021-7.json'),
        require('../data/EnergyData-2021-8.json'),
        require('../data/EnergyData-2021-9.json'),
        require('../data/EnergyData-2021-10.json'),
        require('../data/EnergyData-2021-11.json'),
        require('../data/EnergyData-2021-12.json')
    ]

    charts: Array<EnergyChart> = [];
    aggregatedData = null;


    currentMonth = 1;
    constructor() {
        this.loadData();
        this.showGraph();
        this.changeMonth(1);
        this.setUpSliders();
        this.setupEventListeners();
    }

    private loadData() {
        this.aggregatedData = DataService.aggregateData(this.rawData);
    }

    private setupEventListeners() {
        $('.month-radio').on('change', (e, v) => {
            this.changeMonth(Number($(e.target).val()));
        });

        $('.range').on('change', (e, v) => {
            let element = $(e.target);
            let energyType = element.attr('id').split('-').pop();
            console.log(element.closest('label'));
            element.prev().children().first().html(Number(element.val()) * 100 + "%")
            this.charts.map((chart) => chart.multiply(energyType, Number(element.val())));
            element.attr('alt', Number(element.val()));
        });
    }
    private showGraph() {
        this.charts.push(new EnergyProductionChart($('#energyProductionLine'), this.aggregatedData))
        this.charts.push(new EnergyTableChart($('#carbon-intensity-table'), this.aggregatedData))
    }

    private showCharts() {

    }

    private changeMonth(month: number) {
        for(let chart of this.charts) {
            chart.changeMonth(month)
        }
    }

    private setUpSliders() {
        let html = '';
        Utils.getLabels().forEach((label) => {
            html = html.concat(`<div><label for="range-${label}" class="font-semibold block text-md font-medium text-gray-800">${label} - <span id="range-${label}-display">100%</span></label><input class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full range" id="range-${label}" type="range" min="0" max="3" max="100" step="0.01" value="1" /></div>`)
        })
        $('.sliders').html(html);
    }
    /*
     * Calculate the average value per hour per category by month
     */
}
