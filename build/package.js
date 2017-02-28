#!/usr/bin/env node
/**
 * Package an assembled script for import into tampermonkey.
 */
"use strict";

const readFile = require("util/readFile");
const writeFile = require("util/writeFile");

const info = require("../package.json");

console.log("Packing plugin for Tampermonkey import...");
readFile("build/target/skin.js")
.then((pluginCtnt) => {
	let buf = Buffer.from(pluginCtnt);
	let b64 = buf.toString("base64");

	let plugin = {
		created_by: info.author,
		version: info.version,
		scripts: [
			{
				name: info.name,
				source: b64
			}
		]
	};

	return writeFile("iitc-skin-plugin.js", JSON.stringify(plugin));
})
.then(() => {
	console.log("Done.");
	process.exit(0);
}, function (err) {
	console.error(err.message);
	console.log(err.stack);
	process.exit(1);
});
