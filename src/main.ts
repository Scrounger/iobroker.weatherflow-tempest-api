/*
 * Created with @iobroker/create-adapter v2.6.4
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';
import { XMLHttpRequest } from 'xmlhttprequest-ts';
import * as forecCastTypes from './lib/foreCastTypes'

// Load your modules here, e.g.:
// import * as fs from "fs";

class WeatherflowTempestApi extends utils.Adapter {
	apiEndpoint = 'https://swd.weatherflow.com/swd/rest/';

	public constructor(options: Partial<utils.AdapterOptions> = {}) {
		super({
			...options,
			name: 'weatherflow-tempest-api',
		});
		this.on('ready', this.onReady.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		// this.on('objectChange', this.onObjectChange.bind(this));
		// this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	private async onReady(): Promise<void> {
		const logPrefix = '[onReady]:';

		try {
			// Initialize your adapter here

			// In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
			this.subscribeStates('forecast.update');
			// You can also add a subscription for multiple states. The following line watches all states starting with "lights."
			// this.subscribeStates('lights.*');

		} catch (error: any) {
			this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 */
	private onUnload(callback: () => void): void {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

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
	private async onStateChange(id: string, state: ioBroker.State | null | undefined): Promise<void> {
		const logPrefix = '[onStateChange]:';

		try {
			if (state && !state.from.includes(this.namespace)) {
				if (id.includes(this.namespace)) {
					if (id === `${this.namespace}.forecast.update`) {
						this.updateForeCast();
					}
				}
			} else {
				// The state was deleted
				this.log.info(`state ${id} deleted`);
			}

		} catch (error: any) {
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

	private async updateForeCast(): Promise<void> {
		const logPrefix = '[updateForeCast]:';

		try {
			if (this.config.hourlyEnabled || this.config.dailyEnabled) {
				const url = `${this.apiEndpoint}better_forecast?station_id=${this.config.stationId}&units_temp=${this.config.unitTemperature}&units_wind=${this.config.unitWind}&units_pressure=${this.config.unitPressure}&units_precip=${this.config.unitPrecipitation}&units_distance=${this.config.unitDistance}&token=${this.config.accessToken}`;
				let xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);
				xhr.send();

				if (xhr.status === 200) {
					let data: forecCastTypes.tData = JSON.parse(xhr.responseText);

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
		} catch (error: any) {
			this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
		}
	}

	private async updateForeCastHourly(data: Array<forecCastTypes.tForeCastHourly>): Promise<void> {
		const logPrefix = '[updateForeCastHourly]:';

		try {
			this.log.warn(JSON.stringify(forecCastTypes.stateHourlyDef));

		} catch (error: any) {
			this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
		}
	}

	private async updateForeCastDaily(data: Array<forecCastTypes.tForeCastDaily>): Promise<void> {
		const logPrefix = '[updateForeCastDaily]:';

		try {
		} catch (error: any) {
			this.log.error(`${logPrefix} error: ${error}, stack: ${error.stack}`);
		}
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new WeatherflowTempestApi(options);
} else {
	// otherwise start the instance directly
	(() => new WeatherflowTempestApi())();
}