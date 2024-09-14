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
  stateHourlyDef: () => stateHourlyDef
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
const stateHourlyDef = {
  air_temperature: {
    id: "temperatur",
    common: {
      ...commonDef.number,
      ...{
        unit: "\xB0C",
        name: {
          "en": "Temperature",
          "de": "Temperatur",
          "ru": "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
          "pt": "Temperatura",
          "nl": "Temperatuur",
          "fr": "Temp\xE9rature",
          "it": "Temperatura",
          "es": "Temperatura",
          "pl": "Temperatura",
          "uk": "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430",
          "zh-cn": "\u6E29\u5EA6"
        }
      }
    }
  },
  conditions: {
    id: "conditions",
    common: {
      ...commonDef.string,
      ...{
        name: {
          "en": "Conditions",
          "de": "Bedingungen",
          "ru": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F",
          "pt": "Condi\xE7\xF5es",
          "nl": "Voorwaarden",
          "fr": "Conditions",
          "it": "Condizioni",
          "es": "Condiciones",
          "pl": "Warunki",
          "uk": "\u0423\u043C\u043E\u0432\u0438",
          "zh-cn": "\u6761\u4EF6"
        }
      }
    }
  },
  feels_like: {
    id: "feels_like",
    common: {
      ...commonDef.number,
      ...{
        unit: "\xB0C",
        name: {
          "en": "feels like",
          "de": "f\xFChlt sich an",
          "ru": "\u0447\u0443\u0432\u0441\u0442\u0432\u043E",
          "pt": "parece que",
          "nl": "voelt als",
          "fr": "se sent comme",
          "it": "mi sento come",
          "es": "se siente como",
          "pl": "feels like",
          "uk": "\u0432\u0456\u0434\u0447\u0443\u0432\u0430\u0454 \u0441\u0435\u0431\u0435 \u044F\u043A",
          "zh-cn": "\u611F\u89C9\u50CF"
        }
      }
    }
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
    common: {
      ...commonDef.number,
      ...{
        unit: "mm",
        name: {
          "en": "Precipitation",
          "de": "Niederschlag",
          "ru": "\u041F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u0435",
          "pt": "Precipita\xE7\xE3o",
          "nl": "Neerslag",
          "fr": "Pr\xE9cipitations",
          "it": "Precipitazione",
          "es": "Precipitaci\xF3n",
          "pl": "Zapobieganie",
          "uk": "\u041F\u043E\u0440\u0430\u0434\u0430",
          "zh-cn": "\u964D\u6C34\u91CF"
        }
      }
    }
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
    common: { ...commonDef.number, ...{ unit: "mBar", name: "station pressure" } }
  },
  sea_level_pressure: {
    id: "pressure",
    common: { ...commonDef.number, ...{ unit: "mBar", name: "pressure" } }
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
    common: { ...commonDef.number, ...{ unit: "km/h", name: "wind average" } }
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
    common: { ...commonDef.number, ...{ unit: "km/h", name: "wind gust" } }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  stateHourlyDef
});
//# sourceMappingURL=foreCastTypes.js.map
