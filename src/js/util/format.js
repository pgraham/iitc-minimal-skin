/**
 * Various formatting helpers.
 */
/* eslint-env node */
"use strict";

exports.distance = function (length) {
	if (length > 1000) {
		return Math.floor(length / 1000) + "km";
	}
	return length + "m";
};

exports.percent = function (pct) {
	pct = pct || 0;
	if (pct < 0) {
		pct = 0;
	}

	return pct === 0 ? "" : Math.floor(pct * 100) + "%";
};
