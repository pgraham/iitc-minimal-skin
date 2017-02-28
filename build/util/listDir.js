/**
 * Promise wrapper for readdir.
 */
"use strict";

const fs = require("fs");
const readFile = require("util/readFile");

module.exports = function (path) {
	return new Promise((resolve, reject) => {
		fs.readdir(process.cwd() + "/" + path, function (err, files) {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	}); 
}
