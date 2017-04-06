#!/usr/bin/env node
/**
 * Assemble the grease monkey script into a single file.
 */
"use strict";

const pkg = require("../../package.json");

const readFile = require("util/readFile");
const writeFile = require("util/writeFile");
const listDir = require("util/listDir");
const readDir = require("util/readDir");

const getEmbeddedImageStyles = require("assembly/getEmbeddedImageStyles");

console.log("     - Populating iitc plugin wrapper with sources");
readFile("src/js/plugWrap.js")
.then((plugCtnt) => {

	plugCtnt = plugCtnt.replace("%%VERSION%%", pkg.version);
	plugCtnt = plugCtnt.replace("%%NAME%%", pkg.name);

	let jobs = [];

	jobs.push(
		readFile("build/target/work/bundle.css")
		.then(cssCtnt => {
			plugCtnt = plugCtnt.replace("%%CSS_CONTENT%%", cssCtnt);
		})
	);

	jobs.push(
		readFile("build/target/work/helpers.js")
		.then(helpers => {
			plugCtnt = plugCtnt.replace("%%HELPERS%%", helpers);
		})
	);

	jobs.push(
		readFile("build/target/work/hooks.js")
		.then(hooks => {
			plugCtnt = plugCtnt.replace("%%HOOKS%%", hooks);
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
		return writeFile(`${pkg.name}.user.js`, plugCtnt);
	});
})
.then(() => {

	// Output version and name for subsequent processing to utilize
	return Promise.all([
		writeFile("version", pkg.version),
		writeFile("name", pkg.name)
	])
	.then(() => {
		process.exit(0);
	});
})
.catch(err => {
	console.error(err.message);
	process.exit(1);
});
