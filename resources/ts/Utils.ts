export class Utils {
    static keyForLabel(label: string | undefined) {
        let labelKey = null;
        switch (label) {
            case 'Coal': labelKey = 'power_production_coal_avg'; break;
            case 'Gas': labelKey = 'power_production_gas_avg'; break;
            case 'Wind': labelKey = 'power_production_wind_avg'; break;
            case 'Solar': labelKey = 'power_production_solar_avg'; break;
            case 'Biomass': labelKey = 'power_production_biomass_avg'; break;
            case 'Hydro': labelKey = 'power_production_hydro_avg'; break;
            case 'Nuclear': labelKey = 'power_production_nuclear_avg'; break;
            case 'Import': labelKey = 'total_import_avg'; break;
            case 'Consumption': labelKey = 'total_consumption_avg'; break;
            default: console.log('Oho ein Fehler');
        }
        return labelKey
    }

    static getLabels(): Array<string> {
        return ['Coal', 'Gas', 'Wind', 'Solar', 'Biomass', 'Hydro', 'Nuclear', 'Import']
    }
}