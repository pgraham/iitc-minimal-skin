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

	let replaceCss = readFile("build/target/skin.css")
	.then(cssCtnt => {
		plugCtnt = plugCtnt.replace("%%CSS_CONTENT%%", cssCtnt);
	});

	let replaceHooks = readDir("src/js/hooks")
	.then(hooks => {
		plugCtnt = plugCtnt.replace("%%HOOKS%%", hooks.join("\n"));
	});

	let embedImages = getEmbeddedImageStyles()
	.then(embed => {
		plugCtnt = plugCtnt.replace("%%IMG_EMBED%%", embed);
	});

	return Promise.all([ replaceCss, replaceHooks, embedImages ])
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
