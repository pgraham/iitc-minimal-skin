/**
 * Promise wrapper for fs.readFile.
 */
"use strict";

const fs = require("fs");

module.exports = function readFile(path, encoding) {
	if (encoding === undefined) {
		encoding = "utf8";
	}

	return new Promise((resolve, reject) => {
		fs.readFile(process.cwd() + "/" + path, encoding, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
