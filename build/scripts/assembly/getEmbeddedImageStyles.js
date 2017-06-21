/* eslint-env node, es6 */
/**
 * Build CSS styles for embedded images.
 */
"use strict";

const path = require("path");

const listDir = require("util/listDir");
const readFile = require("util/readFile");

function buildCssRule(cls, type, b64) {
	return `
.${cls} {
	background-image: url(data:image/${type};base64,${b64});
}
`;
}

module.exports = function () {
	let imgDir = "src/img/mods";
	return listDir(imgDir)
	.then(files => {
		return Promise.all(files.map(file => {
			return readFile(imgDir + "/" + file, null)
			.then(buf => {
				let type = path.extname(file).substr(1);
				let cls = path.basename(file, "." + type);

				return buildCssRule(cls, type, buf.toString("base64"));
			});
		})).then(rules => { return rules.join("\n") });
	});
};
