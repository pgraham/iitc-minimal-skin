/**
 * Hook which displays a portal information widget better UX than the one
 * provided by IITC.
 */
"use strict";

import format from "helpers/format";
import svg from "util/dom/svg";
import lookup from "util/lookup";
import { d, s } from "util/dom/el";

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

var LINKS_BG = {};

LINKS_BG.OCTO = [
	"M7,2.75736",
	"H13",
	"L17.24264,7",
	"V13",
	"L13,17.24264",
	"H7",
	"L2.75736,13",
	"V7",
	"Z"
].join(" ");

LINKS_BG.OUT = [];
LINKS_BG.OUT.push([
	"M4.34836,5.409",
	"L2.75736,3.81",
	"L3.81736,2.75736",
	"L5.40836,4.34836"
].join(" "));

LINKS_BG.OUT.push([
	"M14.591,4.34836",
	"L16.182,2.75736",
	"L17.24264,3.818",
	"L15.65164,5.409"
].join(" "));

LINKS_BG.OUT.push([
	"M15.65164,14.591",
	"L17.24264,16.182",
	"L16.182,17.24264",
	"14.591,15.65164"
].join(" "));

LINKS_BG.OUT.push([
	"M5.409,15.65164",
	"L3.818,17.24264",
	"L2.75736,16.182",
	"L4.34836,14.591"
].join(" "));

LINKS_BG.OUT.push([
	"M9.25,2.75736",
	"V0.50736",
	"H10.75",
	"V2.75736"
].join(" "));

LINKS_BG.OUT.push([
	"M17.24264,9.25",
	"H19.49264",
	"V10.75",
	"H17.24264"
].join(" "));

LINKS_BG.OUT.push([
	"M10.75,17.24264",
	"V19.49264",
	"H9.25",
	"V17.24264"
].join(" "));

LINKS_BG.OUT.push([
	"M2.75736,10.75",
	"H0.50736",
	"V9.25",
	"H2.75736"
].join(" "));

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

function buildLinksImg(l, r) {
	var el = svg("0 0 20 20", "out-links")
		.addPath(LINKS_BG.OCTO, "octo");

	LINKS_BG.OUT.forEach(function (d, idx) {
		el.addPath(d, [ "link", idx < l ? "linked" : "" ]);
	});

	if (r === 8) {
		el.addClass("linkable");
	}

	return el;
}

function populateCollapsedView(p, qv) {
	qv.empty();
	d("level").addClass(p.owner.team).text(p.lvl).appendTo(qv);
	d("identity")
		.append(d("name").text(p.name))
		.append(
			d("owner")
				.addClass(p.owner.team)
				.text(p.owner.name)
		)
		.appendTo(qv);

	d("details")
		.appendTo(qv);

	var resos = d("resonators")
		.append(p.reso.map(function (r) {
			return d("reso").append(
				s("energy")
					.width(r.nrg + "%")
					.css("background-color", r.clr)
			);
		}));

	var mods = d("mods").append(p.mods.map(function (m) {
		return d("mod").addClass(m.type);
	}));

	d("health")
		.append(resos)
		.append(mods)
		.appendTo(qv);

	d("links")
		.addClass(p.reso.length === 8 ? "linkable" : "")
		.append(buildLinksImg(p.links, p.reso.length))
		.append(
			d("num-out")
				.append(s("out").text(p.links))
				.append(s("divider").text("/"))
				.append(s("of").text(p.maxLinks))
		)
		.appendTo(qv);
}

function populateExpandedView(p, qv) {
	qv.empty();

	d("resonators")
	.append(p.reso.map(function (r) {
		return d("reso")
		.append(s("energy").append(
			s("level").width(r.nrg + "%").css("background-color", r.clr)
		))
		.append(
			s("owner").text(r.owner)
		);
	}))
	.appendTo(qv);

	d("mods")
	.append(p.mods.map(function (m) {
		return d("mod").addClass(m.type).append(s("owner").text(m.owner));
	}))
	.appendTo(qv);

	d("details")
	.appendTo(qv);
}
