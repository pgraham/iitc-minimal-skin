/**
 * Various formatting helpers.
 */
/* eslint-env node */
"use strict";

exports.distance = function (length) {
	if (length > 1000) {
		return (length / 1000) + "km"
	}
	return length + "m"
}

exports.percent = function (pct) {
	return Math.floor(pct * 100) + "%";
};
