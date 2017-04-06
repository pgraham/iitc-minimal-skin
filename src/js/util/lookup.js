/**
 * Module which exports a function which will lookup a value from a given object
 * using a specified key. If the key is not present in the object, a default can
 * be specified.
 */
"use strict";
export default function (value, values, def) {
	if (values[value]) {
		return values[value];
	}
	return def;
}
