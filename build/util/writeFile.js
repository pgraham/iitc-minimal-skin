/**
 * Promise wrapper for fs.writeFile
 */
"use strict";

const fs = require("fs");

module.exports = function writeFile(path, ctnt) {
	return new Promise((resolve, reject) => {
		fs.writeFile(process.cwd() + "/build/target/" + path, ctnt, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		})
	});
};
