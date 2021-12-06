let _ = require('lodash');

export class DataService {

    static aggregateData(rawData: Array<Array<JSON>>): Array<any> {
        let aggregatedData = [];
        //We always have one extra day and hour hanging around because of the time shift. This has to be deleted:
        delete rawData[rawData.length - 1][_.size(rawData[rawData.length - 1])];

        console.log(rawData[9]);
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


}