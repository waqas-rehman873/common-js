const is = require('./is');

const Big = require('big.js')

module.exports = (() => {
	'use strict';

	/**
	 * An immutable object that allows for arbitrary-precision calculations.
	 *
	 * @public
	 */
	class Decimal {
		constructor(value) {
			this._big = getBig(value);
		}

		add(other) {
			return new Decimal(this._big.plus(getBig(other)));
		}

		subtract(other) {
			return new Decimal(this._big.minus(getBig(other)));
		}

		multiply(other) {
			return new Decimal(this._big.times(getBig(other)));
		}

		divide(other) {
			return new Decimal(this._big.div(getBig(other)));
		}

		round(places, mode) {
			assert.argumentIsRequired('places', places, Number);
			assert.argumentIsRequired('mode', mode, RoundingMode, 'RoundingMode');

			return new Decimal(this._big.round(2), mode.code);
		}

		getIsZero(approximate) {
			assert.argumentIsOptional('approximate', approximate, Boolean);

			return this._big.eq(zero) || (is.boolean(approximate) && approximate && this.round(20, RoundingMode.Normal).getIsZero());
		}

		getIsPositive() {
			return this._big.gt(zero);
		}

		getIsNegative() {
			return this._big.lt(zero);
		}

		toFloat() {
			return parseFloat(this._big.toFixed());
		}

		toFixed() {
			return this._big.toFixed();
		}

		static get Zero() {
			return zero;
		}

		static get RoundingMode() {
			return RoundingMode;
		}

		toString() {
			return '[Decimal]';
		}
	}

	const zero = new Big(0);
	const positiveOne = new Big(1);
	const negativeOne = new Big(-1);

	function getBig(value) {
		if (value instanceof Big) {
			return value;
		} else if (value instanceof Decimal) {
			return value._big;
		} else {
			return new Big(value);
		}
	}

	class RoundingMode {
		constructor(description, code) {
			this._description = description;
			this._code = code;
		}

		get description() {
			return this._description;
		}

		get code() {
			return this._code;
		}

		static get Up() {
			return up;
		}

		static get Down() {
			return down;
		}

		static get Normal() {
			return normal;
		}

		toString() {
			return '[RoundingMode]';
		}
	}

	const up = new RoundingMode('up', 3);
	const down = new RoundingMode('down', 0);
	const normal = new RoundingMode('normal', 1);

	return Decimal;
})();