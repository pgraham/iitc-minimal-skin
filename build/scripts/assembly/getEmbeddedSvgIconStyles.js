/* eslint-env node, es6 */
/**
 * Build CSS styles for embedded svg icons.
 */
"use strict";

const listDir = require("util/listDir");
const readFile = require("util/readFile");

function buildCssRule(cls, b64) {
	return `
.icon-${cls} {
	background-image: url(data:image/svg+xml;base64,${b64});
}
`;
}

module.exports = function () {

	let imgDir = "src/img/svg/icon";
	return listDir(imgDir)
	.then(files => {
		return Promise.all(files.map(file => {

			return readFile(imgDir + "/" + file, null)
			.then(buf => {

				return buildCssRule(file.split(".").shift(), buf.toString("base64"));
			});

		}))
		.then(rules => { return rules.join("\n") });
	});
};
