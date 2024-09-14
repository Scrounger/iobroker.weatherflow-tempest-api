"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var foreCastTypes_exports = {};
__export(foreCastTypes_exports, {
  stateDefinition: () => stateDefinition
});
module.exports = __toCommonJS(foreCastTypes_exports);
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
    def: ""
  }
};
const stateDefinition = {
  air_temperature: {
    id: "temperatur",
    common: { ...commonDef.number, ...{ unit: "unitTemperature" } }
  },
  conditions: {
    id: "conditions",
    common: { ...commonDef.string }
  },
  feels_like: {
    id: "feels_like",
    common: { ...commonDef.number, ...{ unit: "unitTemperature" } }
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
    id: "precipitation",
    common: { ...commonDef.number, ...{ unit: "unitPrecipitation" } }
  },
  precip_icon: {
    ignore: true
  },
  precip_probability: {
    id: "precipitationChance",
    common: { ...commonDef.number, ...{ unit: "%", name: "Percentage of precipitation" } }
  },
  precip_type: {
    id: "precipitationType",
    common: { ...commonDef.string, ...{ name: "type of precipitation" } }
  },
  relative_humidity: {
    id: "humidity",
    common: { ...commonDef.number, ...{ unit: "%", name: "relative humidity" } }
  },
  station_pressure: {
    id: "station_pressure",
    common: { ...commonDef.number, ...{ unit: "unitPressure", name: "station pressure" } }
  },
  sea_level_pressure: {
    id: "pressure",
    common: { ...commonDef.number, ...{ unit: "unitPressure", name: "pressure" } }
  },
  time: {
    id: "date",
    common: { ...commonDef.string, ...{ name: "date" } }
  },
  uv: {
    id: "uv",
    common: { ...commonDef.number, ...{ name: "uv index" } }
  },
  wind_avg: {
    id: "windAvg",
    common: { ...commonDef.number, ...{ unit: "unitWind", name: "wind average" } }
  },
  wind_direction: {
    id: "windDirection",
    common: { ...commonDef.number, ...{ unit: "\xB0", name: "wind direction" } }
  },
  wind_direction_cardinal: {
    id: "windDirectionCardinal",
    common: { ...commonDef.string, ...{ name: "Cardinal wind direction" } }
  },
  wind_gust: {
    id: "windGust",
    common: { ...commonDef.number, ...{ unit: "unitWind", name: "wind gust" } }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  stateDefinition
});
//# sourceMappingURL=foreCastTypes.js.map
