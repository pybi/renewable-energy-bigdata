import {EnergyChart} from "./EnergyChart";
import * as $ from 'jquery';
import Chart from "chart.js/auto";
import {Colors} from "../Colors";
import {data} from "jquery";
import {Utils} from "../Utils";
let _ = require('lodash');
// import hexToRgba from 'hex-to-rgba';


export class EnergyTableChart extends EnergyChart {
    chartType = 'table';

    constructor(ctx: JQuery<HTMLElement>, aggregatedData: Array<any>) {
        super(ctx,aggregatedData);
    }
    getXScale() {
    }

    getYScale() {
    }

    getData(): any {
    }

    getChartType(): string {
        return 'table';
    }

    changeMonth(month: number) {
        this.customChart();
    }

    customChart() {
        //Farbe muss noch gemacht werden
        let segment = Utils.keyForLabel(this.$ctx.data('segment'));
        let $tbody = this.$ctx.find('tbody');
        $tbody.html('');
        for(let i = 0; i < 24; i++) {
            $tbody.append(`<tr><td>${i}</td></tr>`);
        }
        let color = '#FF0000'
        if(this.$ctx.data('segment') == "Solar") {
            color = Colors.solar;
        } else {
            color = Colors.wind;
        }
        EnergyChart.mutatedData.forEach((month, index) => {
           let segmentData: Array<number> = month[segment];
           segmentData.forEach((value, hour) => {
               let $tr = $tbody.find('tr').eq(hour);
               $tr.append(`<td>${Math.round(value).toLocaleString()}</td>`);
               let alpha = `0${Math.round(((value/EnergyChart.getMaxFor(segment)) * 255)/3).toString(16)}`.slice(-2);
               $tr.children().last().css('background-color', color + alpha);
           })
        });
    }
}
