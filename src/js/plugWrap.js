// ==UserScript==
// @name         IITC skin
// @namespace    https://github.com/jonatkins/ingress-intel-total-conversion
// @version      %%VERSION%%
// @description  Nicer skin for IITC desktop
// @author       Philip Graham <https://github.com/pgraham>
// @match        https://*.ingress.com/intel*
// @grant        none
// ==/UserScript==

if (window.plugin === undefined) {
	window.plugin = function () {};
}
window.plugin.minSkin = { hooks: [] };

%%HELPERS%%

%%HOOKS%%

(function() {
	'use strict';

	function addStyle(contentProvider) {
		let style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(contentProvider()));
		document.head.appendChild(style);
	}

	function installHooks() {
		let hooks = window.plugin.minSkin.hooks;

		hooks.forEach(function (hook) {
			window.addHook(hook.event, hook.handler);
		});
	}

	function init() {
		// This log statement has been left in the code intentionally since it can
		// be used to open the script source from the console in order to add
		// breakpoints.
		console.log("Initializing minimal skin");

		addStyle(getIITCSkinCss);
		addStyle(getEmbeddedImageStyles);
		installHooks();
	}

	init.info = { pluginId: "minimal-skin", dateTimeVersion: "0.1" };
	if(!window.bootPlugins) window.bootPlugins = [];
	window.bootPlugins.push(init);
})();

/* 
 * ===========================================================================
 * Imbedded content goes here.
 * ===========================================================================
 */

function getIITCSkinCss() {
	return `
%%CSS_CONTENT%%
`;
}

function getEmbeddedImageStyles() {
	return `
%%IMG_EMBED%%
`;
}
