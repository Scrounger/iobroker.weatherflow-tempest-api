export interface tData {
    current_conditions: tForeCastCurrent;
    forecast: tForeCast;
    units: any;
    latitude: number;
    longitude: number;
    location_name: string;
    timezone: string;
    timezone_offset_minutes: number;
    status: {
        status_code: number;
        status_message: string;
    }
}

export interface tForeCast {
    hourly: Array<tForeCastHourly>;
    daily: Array<tForeCastDaily>;
}

export interface tForeCastCurrent {
    air_density: number;
    air_temperature: number;
    brightness: number;
    delta_t: number;
    dew_point: number;
    feels_like: number;
    is_precip_local_day_rain_check: boolean;
    is_precip_local_yesterday_rain_check: boolean;
    lightning_strike_count_last_1hr: number;
    lightning_strike_count_last_3hr: number;
    lightning_strike_last_distance: number;
    lightning_strike_last_distance_msg: string;
    lightning_strike_last_epoch: number;
    precip_accum_local_day: number;
    precip_accum_local_yesterday: number;
    precip_minutes_local_day: number;
    precip_minutes_local_yesterday: number;
    pressure_trend: string;
    relative_humidity: number;
    sea_level_pressure: number;
    solar_radiation: number;
    station_pressure: number;
    time: number;
    uv: number;
    wet_bulb_globe_temperature: number;
    wet_bulb_temperature: number;
    wind_avg: number;
    wind_direction: number;
    wind_direction_cardinal: string;
    wind_gust: number;
}

export interface tForeCastHourly {
    air_temperature: number;
    conditions: string;
    feels_like: number;
    icon: string;
    local_day: number;
    local_hour: number;
    precip: number;
    precip_icon: string;
    precip_probability: number;
    precip_type: string;
    relative_humidity: number;
    station_pressure: number;
    sea_level_pressure: number;
    time: number;
    uv: number;
    wind_avg: number;
    wind_direction: number;
    wind_direction_cardinal: string;
    wind_gust: number;
}

export interface tForeCastDaily {
    air_temp_high: number;
    air_temp_low: number;
    conditions: string;
    day_num: number;
    day_start_local: number;
    icon: string;
    month_num: number;
    precip_icon: string;
    precip_probability: number;
    precip_type: string;
    sunrise: number;
    sunset: number;
}

export interface tStateDefinition {
    id?: string,
    common?: any,
    ignore?: boolean,
}

const commonDef = {
    number: {
        type: "number",
        read: true,
        write: false,
        role: "value",
        def: 0
    },
    string: {
        type: "string",
        read: true,
        write: false,
        role: "value",
        def: ''
    }
}

export const stateDefinition: { [key: string]: tStateDefinition; } = {
    air_temperature: {
        id: 'temperatur',
        common: { ...commonDef.number, ... { unit: 'unitTemperature' } },
    },
    conditions: {
        id: 'conditions', common: { ...commonDef.string }
    },
    feels_like: {
        id: 'feels_like',
        common: { ...commonDef.number, ... { unit: 'unitTemperature' } }
    },
    icon: {
        ignore: true
    },
    local_day: {
        ignore: true
    },
    local_hour: {
        ignore: true
    },
    precip: {
        id: 'precipitation',
        common: { ...commonDef.number, ... { unit: 'unitPrecipitation' } }
    },
    precip_icon: {
        ignore: true
    },
    precip_probability: {
        id: "precipitationChance",
        common: { ...commonDef.number, ... { unit: '%', name: 'Percentage of precipitation' } }
    },
    precip_type: {
        id: 'precipitationType',
        common: { ...commonDef.string, ... { name: 'type of precipitation' } }
    },
    relative_humidity: {
        id: "humidity",
        common: { ...commonDef.number, ... { unit: '%', name: 'relative humidity' } }
    },
    station_pressure: {
        id: "station_pressure",
        common: { ...commonDef.number, ... { unit: 'unitPressure', name: 'station pressure' } }
    },
    sea_level_pressure: {
        id: "pressure",
        common: { ...commonDef.number, ... { unit: 'unitPressure', name: 'pressure' } }
    },
    time: {
        id: 'date',
        common: { ...commonDef.string, ... { name: 'date' } }
    },
    uv: {
        id: "uv",
        common: { ...commonDef.number, ... { name: 'uv index' } }
    },
    wind_avg: {
        id: "windAvg",
        common: { ...commonDef.number, ... { unit: 'unitWind', name: 'wind average' } }
    },
    wind_direction: {
        id: "windDirection",
        common: { ...commonDef.number, ... { unit: '°', name: 'wind direction' } }
    },
    wind_direction_cardinal: {
        id: 'windDirectionCardinal',
        common: { ...commonDef.string, ... { name: 'Cardinal wind direction' } }
    },
    wind_gust: {
        id: 'windGust',
        common: { ...commonDef.number, ... { unit: 'unitWind', name: 'wind gust' } }
    }
}
