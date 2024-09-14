"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var utils = __toESM(require("@iobroker/adapter-core"));
var import_xmlhttprequest_ts = require("xmlhttprequest-ts");
var import_moment = __toESM(require("moment"));
var forecCastTypes = __toESM(require("./lib/foreCastTypes"));
var myHelper = __toESM(require("./lib/helper"));
class WeatherflowTempestApi extends utils.Adapter {
  apiEndpoint = "https://swd.weatherflow.com/swd/rest/";
  myTranslation;
  constructor(options = {}) {
    super({
      ...options,
      name: "weatherflow-tempest-api"
    });
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }
  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {
    const logPrefix = "[onReady]:";
    try {
      await this.loadTranslation();
      this.subscribeStates("forecast.update");
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   */
  onUnload(callback) {
    try {
      callback();
    } catch (e) {
      callback();
    }
  }
  // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
  // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
  // /**
  //  * Is called if a subscribed object changes
  //  */
  // private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
  // 	if (obj) {
  // 		// The object was changed
  // 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
  // 	} else {
  // 		// The object was deleted
  // 		this.log.info(`object ${id} deleted`);
  // 	}
  // }
  /**
   * Is called if a subscribed state changes
   */
  async onStateChange(id, state) {
    const logPrefix = "[onStateChange]:";
    try {
      if (state && !state.from.includes(this.namespace)) {
        if (id.includes(this.namespace)) {
          if (id === `${this.namespace}.forecast.update`) {
            this.updateForeCast();
          }
        }
      } else {
        this.log.info(`state ${id} deleted`);
      }
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
  // /**
  //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
  //  * Using this method requires "common.messagebox" property to be set to true in io-package.json
  //  */
  // private onMessage(obj: ioBroker.Message): void {
  // 	if (typeof obj === 'object' && obj.message) {
  // 		if (obj.command === 'send') {
  // 			// e.g. send email or pushover or whatever
  // 			this.log.info('send command');
  // 			// Send response in callback if required
  // 			if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
  // 		}
  // 	}
  // }
  async updateForeCast() {
    const logPrefix = "[updateForeCast]:";
    try {
      if (this.config.hourlyEnabled || this.config.dailyEnabled) {
        const url = `${this.apiEndpoint}better_forecast?station_id=${this.config.stationId}&units_temp=${this.config.unitTemperature}&units_wind=${this.config.unitWind}&units_pressure=${this.config.unitPressure}&units_precip=${this.config.unitPrecipitation}&units_distance=${this.config.unitDistance}&token=${this.config.accessToken}`;
        let xhr = new import_xmlhttprequest_ts.XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          if (data && data.forecast) {
            this.log.silly(JSON.stringify(data.forecast));
            await this.updateForeCastHourly(data.forecast.hourly);
            await this.updateForeCastDaily(data.forecast.daily);
          } else {
            this.log.error(`${logPrefix} Tempest Forecast has no forecast data`);
          }
        } else {
          this.log.error(`${logPrefix} Tempest Forecast error, code: ${xhr.status}`);
        }
      }
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  async updateForeCastHourly(data) {
    const logPrefix = "[updateForeCastHourly]:";
    try {
      if (this.config.hourlyEnabled && data) {
        await this.createOrUpdateChannel(`forecast.daily`, this.myTranslation["hourly"]);
        for (var i = 0; i <= data.length - 1; i++) {
          const item = data[i];
          const timestamp = import_moment.default.unix(item.time);
          const calcHours = import_moment.default.duration(timestamp.diff((0, import_moment.default)().startOf("hour"))).asHours();
          await this.createOrUpdateChannel(`forecast.daily.${myHelper.zeroPad(calcHours, 3)}`, this.myTranslation["inXhours"].replace("{0}", calcHours.toString()));
          for (const [key, val] of Object.entries(item)) {
            if (forecCastTypes.stateHourlyDef[key]) {
              if (!forecCastTypes.stateHourlyDef[key].ignore) {
                this.log.warn(key);
              } else {
                this.log.debug(`${logPrefix} state '${key}' will be ignored`);
              }
            } else {
              this.log.warn(`${logPrefix} no state definition exist for '${key}' (file: './lib/foreCastTypes.ts')`);
            }
          }
          if (i >= this.config.hourlyMax - 1) {
            break;
          }
        }
      } else {
        this.log.warn(`${logPrefix} downloaded data does not contain a hourly forecast!`);
      }
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  async updateForeCastDaily(data) {
    const logPrefix = "[updateForeCastDaily]:";
    try {
      if (this.config.dailyEnabled && data) {
      } else {
        this.log.warn(`${logPrefix} downloaded data does not contain a daily forecast!`);
      }
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  async createOrUpdateChannel(id, name) {
    const logPrefix = "[updateForeCastDaily]:";
    try {
      const common = {
        name
        // icon: myDeviceImages[nvr.type] ? myDeviceImages[nvr.type] : null
      };
      if (!await this.objectExists(id)) {
        this.log.debug(`${logPrefix} - creating channel '${id}'`);
        await this.setObjectAsync(id, {
          type: "channel",
          common,
          native: {}
        });
      } else {
        const obj = await this.getObjectAsync(id);
        if (obj && obj.common) {
          if (JSON.stringify(obj.common) !== JSON.stringify(common)) {
            await this.extendObject(id, { common });
            this.log.debug(`${logPrefix} channel updated '${id}'`);
          }
        }
      }
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  async createOrUpdateState(folderId, idNumber, key, stateDef, val) {
    const logPrefix = "[createOrUpdateState]:";
    try {
    } catch (err) {
      console.error(`${logPrefix} error: ${err.message}, stack: ${err.stack}`);
    }
  }
  async loadTranslation() {
    const logPrefix = "[loadTranslation]:";
    try {
      const config = await this.getForeignObjectAsync("system.config");
      this.language = (config == null ? void 0 : config.common.language) || "en";
      const fileName = `../admin/i18n/${this.language}/translations.json`;
      this.myTranslation = (await Promise.resolve().then(() => __toESM(require(fileName)))).default;
      this.log.debug(`${logPrefix} translation data loaded from '${fileName}'`);
    } catch (err) {
      console.error(`${logPrefix} error: ${err.message}, stack: ${err.stack}`);
    }
  }
}
if (require.main !== module) {
  module.exports = (options) => new WeatherflowTempestApi(options);
} else {
  (() => new WeatherflowTempestApi())();
}
//# sourceMappingURL=main.js.map
