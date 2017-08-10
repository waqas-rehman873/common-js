const assert = require('./assert'),
	is = require('./is');

const moment = require('moment-timezone');

module.exports = (() => {
	'use strict';

	/**
	 * A data structure encapsulates (and lazy loads) a moment (see https://momentjs.com/).
	 *
	 * @public
	 * @param {Number} timestamp
	 * @param {String=} timezone
	 */
	class Timestamp {
		constructor(timestamp, timezone) {
			assert.argumentIsValid(timestamp, 'timestamp', is.large, 'is an integer');
			assert.argumentIsOptional(timezone, 'timezone', String);

			this._timestamp = timestamp;
			this._timezone = timezone || null;

			this._moment = null;
		}

		/**
		 * The timestamp.
		 *
		 * @returns {Number}
		 */
		get timestamp() {
			return this._timestamp;
		}

		/**
		 * The moment instance.
		 *
		 * @returns {moment}
		 */
		get moment() {
			if (this._moment === null) {
				this._moment = moment(this._timestamp);

				if (this._timezone !== null) {
					this.moment.tz(this._timezone);
				}
			}

			return this._moment;
		}

		toString() {
			return '[Timestamp]';
		}
	}

	return Timestamp;
})();