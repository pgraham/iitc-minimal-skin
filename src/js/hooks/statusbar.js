/**
 * Capture the logic for rendering the status bar to give it a smaller
 * footprint in a way not possble through CSS.
 */
"use strict";
import svg from "util/dom/svg";
import { distance as fmtDist, percent as fmtPct } from "helpers/format";
import { s } from "util/dom/el";

var PORTAL_STATUS_HELP = "Indicates portal levels/link lengths displayed.  Zoom in to display more.";

window.plugin.minSkin.components.push({
	init: function () {
		initEl();

		var renderTimer;
			// Buffer calls to render
		window.renderUpdateStatus = function () {
			clearTimeout(renderTimer);
			renderTimer = setTimeout(render);
		};
	}
});

var el, loadLevel, reqStatus, reqStatusText;
function initEl() {
	el = s("status-container").attr("title", PORTAL_STATUS_HELP);
	loadLevel = s("load-level").appendTo(el);

	reqStatus = s("request-status").appendTo(el);
	reqStatusText = s("request-status-text").appendTo(reqStatus);
	var loading = initLoading();
	reqStatus.append(loading);

	$("#updatestatus").empty().append(el);
}

function initLoading() {
	return svg([ 0, 0, 100, 100 ], "loading")
		.addCircle([ 50, 50 ], 48);
}

function render() {
	var zoom = getDataZoomForMapZoom(map.getZoom());
	var tileParams = getMapZoomTileParameters(zoom);

	if (tileParams.hasPortals) {
		var lvl = tileParams.level;

		if (tileParams.level === 0) {
			loadLevel.text("all");
		} else {
			loadLevel.text("L" + lvl + (lvl < 8 ? "+" : ""));
			loadLevel.css("background", COLORS_LVL[lvl]);
		}
	} else {
		if (tileParams.minLinkLength > 0) {
			loadLevel.text(">" + fmtDist(tileParams.minLinkLength));
		} else {
			loadLevel.text("all links");
		}
	}

	if (window.mapDataRequest) {
		var status = window.mapDataRequest.getStatus();

		// status.short    - short description of status
		// status.long     - longer description, for tooltip (optional)
		// status.progress - fractional progress (from 0 to 1; -1 for
		//                   indeterm current state (optional
		reqStatusText.text(fmtPct(status.progress));
		reqStatus.attr("title", status.long || "");
	}

	//request status
	if (status.progress > 0 || window.activeRequests.length > 0) {
		reqStatus.addClass("sumpin-doon");
	} else {
		reqStatus.removeClass("sumpin-doon");
	}


	if (window.failedRequestCount > 0) {
		reqStatus.addClass("sumpin-wrong");
	} else {
		reqStatus.removeClass("sumpin-wrong");
	}
}
