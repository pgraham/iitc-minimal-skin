/**
 * Consolidate tools into a single bar.
 */
const topRightSel = ".leaflet-top.leaflet-right";
const topLeftSel = ".leaflet-top.leaflet-left";
const bottomRightSel = ".leaflet-bottom.leaflet-right";

function buildMinSkinControl() {
	let control = $("<div/>").addClass("leaflet-control minskin-control");

	$("<div/>")
		.addClass("minskin-general-info")
		.appendTo(control);

	$("<div/>")
		.addClass("icon icon-ingress leaflet-minskin-toggle")
		.appendTo(control)
		.click(() => {
			control.toggleClass("open");
		});

	return control;
}

window.plugin.minSkin.components.push({
	init: () => {
		let topLeft = $(topLeftSel);
		let topRight = $(topRightSel);
		let bottomRight = $(bottomRightSel);

		topLeft.children(".leaflet-control-zoom").detach().appendTo(bottomRight);
		topLeft.children().detach().appendTo(topRight);

		topRight.prepend(buildMinSkinControl());
	}
});
