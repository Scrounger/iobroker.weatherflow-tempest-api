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
var forecCastTypes = __toESM(require("./lib/foreCastTypes"));
class WeatherflowTempestApi extends utils.Adapter {
  apiEndpoint = "https://swd.weatherflow.com/swd/rest/";
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
      await this.setObjectNotExistsAsync("testVariable", {
        type: "state",
        common: {
          name: "testVariable",
          type: "boolean",
          role: "indicator",
          read: true,
          write: true
        },
        native: {}
      });
      this.subscribeStates("forecast.update");
      await this.setStateAsync("forecast.update", true);
      await this.setStateAsync("testVariable", { val: true, ack: true });
      await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });
      let result = await this.checkPasswordAsync("admin", "iobroker");
      this.log.info("check user admin pw iobroker: " + result);
      result = await this.checkGroupAsync("admin", "admin");
      this.log.info("check group user admin group admin: " + result);
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
            this.log.warn(JSON.stringify(data.forecast));
            if (this.config.hourlyEnabled && data.forecast.hourly) {
              this.updateForeCastHourly(data.forecast.hourly);
            } else {
              this.log.warn(`${logPrefix} downloaded data does not contain a hourly forecast!`);
            }
            if (this.config.dailyEnabled && data.forecast.daily) {
              this.updateForeCastDaily(data.forecast.daily);
            } else {
              this.log.warn(`${logPrefix} downloaded data does not contain a daily forecast!`);
            }
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
      this.log.warn(JSON.stringify(forecCastTypes.stateHourlyDef));
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
  async updateForeCastDaily(data) {
    const logPrefix = "[updateForeCastDaily]:";
    try {
    } catch (error) {
      this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
    }
  }
}
if (require.main !== module) {
  module.exports = (options) => new WeatherflowTempestApi(options);
} else {
  (() => new WeatherflowTempestApi())();
}
//# sourceMappingURL=main.js.map
