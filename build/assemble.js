#!/usr/bin/env node
/**
 * Assemble the grease monkey script into a single file.
 */
"use strict";

const readFile = require("util/readFile");
const writeFile = require("util/writeFile");
const listDir = require("util/listDir");
const readDir = require("util/readDir");

const getEmbeddedImageStyles = require("assembly/getEmbeddedImageStyles");

console.log("Assembling plugin source...");
readFile("src/js/plugWrap.js")
.then((plugCtnt) => {

	let jobs = [];

	jobs.push(
		readFile("build/target/skin.css")
		.then(cssCtnt => {
			plugCtnt = plugCtnt.replace("%%CSS_CONTENT%%", cssCtnt);
		})
	);

	jobs.push(
		readFile("src/js/helpers.js")
		.then(helpers => {
			plugCtnt = plugCtnt.replace("%%HELPERS%%", helpers);
		})
	);

	jobs.push(
		readDir("src/js/hooks")
		.then(hooks => {
			plugCtnt = plugCtnt.replace("%%HOOKS%%", hooks.join("\n"));
		})
	);

	jobs.push(
		getEmbeddedImageStyles()
		.then(embed => {
			plugCtnt = plugCtnt.replace("%%IMG_EMBED%%", embed);
		})
	);

	return Promise.all(jobs)
	.then(() => {
		return writeFile("skin.js", plugCtnt);
	});
})
.then(() => {
	console.log("Done.");
	process.exit(0);
}, function (err) {
	console.error(err.message);
	process.exit(1);
});
