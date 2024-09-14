export interface tData {
    status: any;
    current_conditions: any;
    forecast: tForeCast;
    units: any;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_offset_minutes: number;
}

export interface tForeCast {
    hourly: Array<tForeCastHourly>;
    daily: Array<tForeCastDaily>;
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

export const stateHourlyDef = {
    air_temperature: {
        id: 'temperatur',
        common: { ...commonDef.number, ... { unit: '°C', name: 'temperatur' } }
    },
    conditions: {
        id: 'conditions',
        common: { ...commonDef.string, ... { name: 'conditions' } }
    },
    feels_like: {
        id: 'feels_like',
        common: { ...commonDef.number, ... { unit: '°C', name: 'feels like' } }
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
        common: { ...commonDef.number, ... { unit: 'mm', name: 'feels like' } }
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
        common: { ...commonDef.number, ... { unit: 'mBar', name: 'station pressure' } }
    },
    sea_level_pressure: {
        id: "pressure",
        common: { ...commonDef.number, ... { unit: 'mBar', name: 'pressure' } }
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
        common: { ...commonDef.number, ... { unit: 'km/h', name: 'wind average' } }
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
        common: { ...commonDef.number, ... { unit: 'km/h', name: 'wind gust' } }
    }
}
