/**
 * Consolidate tools into a single bar.
 */
import { buildPlayerInfo } from "view/infobar/playerInfo";
import {d } from "util/dom/el";

const topRightSel = ".leaflet-top.leaflet-right";
const topLeftSel = ".leaflet-top.leaflet-left";
const bottomRightSel = ".leaflet-bottom.leaflet-right";

function buildMinSkinControl() {
	let control = d("minskin-control leaflet-control");

	let container = d("minskin-general-info").appendTo(control);
	buildPlayerInfo().appendTo(container);
	// buildScores().appendTo(container);
	// buildInputs().appendTo(container);
	// buildActions().appendTo(container);

	d("icon icon-ingress minskin-toggle")
		.appendTo(control)
		.click(() => {
			container.toggleClass("open");
		});

	return control;
}

window.plugin.minSkin.components.push({
	init: () => {
		let topLeft = $(topLeftSel);
		let topRight = $(topRightSel);
		let bottomRight = $(bottomRightSel);

		let iitcCtrls = $("<div/>").addClass("iitc-controls");

		// Move controls on left side of screen to the right to make room for portal
		// quickview and chat window. Zoom controls go to bottom right while
		// everything else is moved to the top right inside of a container for IITC
		// controls.
		//
		// This is the beginning of a compatibility layer for existing
		// plugin controls. The generic rules for where to place existing IITC
		// plugin controls will need to be fleshed out and special cases will need
		// to be accomodated.
		topLeft.children(".leaflet-control-zoom").detach().appendTo(bottomRight);
		topRight.children().detach().appendTo(iitcCtrls);
		topLeft.children().detach().appendTo(iitcCtrls);

		// Add minskin controls toggle and existing IITC controls to top right.
		topRight.append(buildMinSkinControl());
		topRight.append(iitcCtrls);
	}
});
