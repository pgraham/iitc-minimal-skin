/**
 * Hook which displays a portal information widget better UX than the one
 * provided by IITC.
 */
"use strict";

import getTeamCode from "util/getTeamCode";
import { d, el } from "util/dom/el";

import { populateCollapsedView } from "view/qv/collapsedInfo";
import { populateExpandedView } from "view/qv/expandedInfo";
import { populateActions } from "view/qv/actions";

window.plugin.minSkin.hooks.push({
	event: "portalDetailsUpdated",
	handler: function (data) {
		var p = getPortalInfo(data);

		// Update portal quickview
		var container = getPortalQuickview();

		populateCollapsedView(p, container.find(".collapsed-info"));
		populateExpandedView(p, container.find(".expanded-info"));
		populateActions(p, container.find(".portal-actions"));

		if (container.data("portal-id") !== data.guid) {
			// Only force the quickview open if this is a new portal

			// TODO Hook into IITC to be able to determine if this is a polling
			// refresh of a user initiated click.
			setTimeout(function () {
				$("body").addClass("portalquickview-open");
				if (container.is(".expanded")) {
					$("body").addClass("portalquickview-expanded");
				}
				container.removeClass("hide");
			});
		}
		container.data("portal-id", data.guid);
	}
});

function getPortalInfo(data) {
	var info = {};

	let numFields = window.getPortalFieldsCount(data.guid);
	let numLinks = window.getPortalLinksCount(data.guid);

	info.name = data.portalDetails.title;
	info.img = window.fixPortalImageUrl(data.portalDetails.image);
	info.lvl = data.portalDetails.level;
	info.teamId = teamStringToId(data.team);
	info.owner = {
		name: data.portalDetails.owner,
		team: getTeamCode(data.portalDetails.team)
	};
	info.isFriendly = (
		getTeamCode(PLAYER.team) === getTeamCode(data.portalDetails.team)
	);
	info.isCaptured = getTeamCode(data.portalDetails.team) !== "none";

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

		let modType = [ m.rarity, m.name ].join(" ").toLowerCase();
		modType = modType.replace(/[\s_]+/g, "-");
		modType = modType.replace(/\(-\)$/, "minus");
		modType = modType.replace(/\(\+\)$/, "plus");

		return {
			type: modType,
			owner: m.owner
		};
	});

	let linkInfo = window.getPortalLinks(data.guid);
	info.links = {
		out: linkInfo.out.length,
		in: linkInfo.in.length,
		max: window.getMaxOutgoingLinks(data.portalDetails),
		total: numLinks,
		fields: numFields,
		info: linkInfo
	};
	info.range = window.getPortalRange(data.portalDetails);
	info.mitigation = window.getPortalMitigationDetails(
		data.portalDetails,
		window.getPortalLinksCount(data.guid)
	);

	info.ap = window.getAttackApGain(
		data.portalDetails,
		numFields,
		numLinks
	);

	info.hacks = window.getPortalHackDetails(data.portalDetails);

	info.nrg = {
		current: window.getCurrentPortalEnergy(data.portalDetails),
		total: window.getTotalPortalEnergy(data.portalDetails)
	};

	let attackInfo = window.getPortalAttackValues(data.portalDetails);
	info.attack = {
		freq: attackInfo.attack_frequency,
		hit: attackInfo.hit_bonus,
		force: attackInfo.force_amplifier
	};

	// Position info
	info.lat = data.portalData.latE6 / 1e6;
	info.lng = data.portalData.lngE6 / 1e6;
	info.latlng = `${info.lat},${info.lng}`;

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
		el("button", "close")
			.addClass("icon icon-close")
			.click(function () {
				$("body").removeClass("portalquickview-open portalquickview-expanded");
				qv.addClass("hide");
			})
			.appendTo(actions);

		el("button", "expand")
			.addClass("icon icon-arrow-drop-down")
			.click(function () {
				if (qv.is(".expanded")) {
					$("body").removeClass("portalquickview-expanded");
					qv.removeClass("expanded");
					$(this).removeClass("icon-arrow-drop-up").addClass("icon-arrow-drop-down");
				} else {
					$("body").addClass("portalquickview-expanded");
					qv.addClass("expanded");
					$(this).removeClass("icon-arrow-drop-down").addClass("icon-arrow-drop-up");
				}
			})
			.appendTo(actions);

		d("portal-actions").appendTo(actions);
	}
	return qv;
}
