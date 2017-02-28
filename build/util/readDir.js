/**
 * Wrapper for listDir that returns the contents of each file in the
 * directory.
 */
"use strict";

const listDir = require("util/listDir");
const readFile = require("util/readFile");

module.exports = function (path, encoding) {
	return listDir(path)
	.then(files => {
		return Promise.all(
			files.map( file => readFile(path + "/" + file, encoding) )
		);
	});

};
