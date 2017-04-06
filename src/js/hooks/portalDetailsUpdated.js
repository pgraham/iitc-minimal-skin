/**
 * Hook which displays a portal information widget better UX than the one
 * provided by IITC.
 */
"use strict";

import lookup from "util/lookup";
import { d } from "util/dom/el";

import { populateCollapsedView } from "view/qv/collapsedInfo";
import { populateExpandedView } from "view/qv/expandedInfo";

window.plugin.minSkin.hooks.push({
	event: "portalDetailsUpdated",
	handler: function (data) {
		var p = getPortalInfo(data);

		// Update portal quickview
		var container = getPortalQuickview();

		populateCollapsedView(p, container.find(".collapsed-info"));
		populateExpandedView(p, container.find(".expanded-info"));

		setTimeout(function () {
			$("body").addClass("portalquickview-open");
			container.removeClass("hide");
		});
	}
});

function getPortalInfo(data) {
	var info = {};

	info.name = data.portalDetails.title;
	info.lvl = data.portalDetails.level;
	info.owner = {
		name: data.portalDetails.owner,
		team: lookup(data.portalDetails.team, {
			"E": "enl",
			"R": "res",
			"N": "none"
		}, "none")
	};
	info.reso = data.portalDetails.resonators
		.map(function (r) {
			return {
				lvl: r.level,
				clr: COLORS_LVL[r.level],
				nrg: r.energy / RESO_NRG[r.level] * 100,
				owner: r.owner
			};
		})
		.sort(function (a, b) {
			return b.lvl - a.lvl;
		});
	info.mods = data.portalDetails.mods.map(function (m) {
		if (m === null) {
			return "";
		}

		return {
			type: [ m.rarity, m.name ].join(" ").toLowerCase().replace(/[\s_]+/g, "-"),
			owner: m.owner
		};
	});
	info.links = window.getPortalLinks(data.guid).out.length;
	info.maxLinks = window.getMaxOutgoingLinks(data.portalDetails);
	info.range = window.getPortalRange(data.portalDetails);

	return info;
}

function getPortalQuickview() {
	var qv = $("#portal-quickview");
	if (qv.length === 0) {
		qv = $("<div/>")
			.attr("id", "portal-quickview")
			.addClass("hide")
			.append($("<div/>").addClass("collapsed-info"))
			.append($("<div/>").addClass("expanded-info"))
			.appendTo('body');

		var actions = d("actions").appendTo(qv);
		d("close")
			.text("✕")
			.click(function () {
				$("body").removeClass("portalquickview-open portalquickview-expanded");
				qv.addClass("hide");
			})
			.appendTo(actions);

		d("expand")
			.text("▼")
			.click(function () {
				if (qv.is(".expanded")) {
					$("body").removeClass("portalquickview-expanded");
					qv.removeClass("expanded");
					$(this).text("▼");
				} else {
					$("body").addClass("portalquickview-expanded");
					qv.addClass("expanded");
					$(this).text("▲");
				}
			})
			.appendTo(actions);
	}
	return qv;
}
