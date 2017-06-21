/**
 * Module which builds the collapsed portion of the portal quick view.
 */
"use strict";

import { d, s } from "util/dom/el";

import { buildLinksImg } from "view/qv/linksBg";

function buildShieldMitigation(mitigation) {
	const activeWidth = Math.round(mitigation.total / 95 * 100);
	const excessWidth = Math.round(mitigation.excess / 95 * 100);

	return d("shields")
		.addClass("icon icon-shield")
		.append(s("active").width(activeWidth + "%"))
		.append(s("excess").width(excessWidth + "%"));
}

function buildApGain(p) {
	let us, them;
	if (!p.isCaptured) {
		us = p.ap.enemyAp;
		them = p.ap.enemyAp;
	} else {
		us = p.isFriendly ? p.ap.friendlyAp : p.ap.enemyAp;
		them = p.isFriendly ? p.ap.enemyAp : p.ap.friendlyAp;
	}

	const usTeam = teamStringToId(PLAYER.team) === TEAM_ENL ? "enl" : "res";
	const themTeam = teamStringToId(PLAYER.team) === TEAM_RES ? "enl" : "res";

	return d("ap")
		.addClass("icon icon-ap")
		.append(s(usTeam).html(us.toLocaleString()))
		.append(s(themTeam).html(them.toLocaleString()));
}

export function populateCollapsedView(p, qv) {
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
		.append(buildApGain(p))
		.append(buildShieldMitigation(p.mitigation))
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
		.append(buildLinksImg(p.links.out, p.reso.length))
		.append(
			d("num-out")
				.append(s("out").text(p.links.out))
				.append(s("divider").text("/"))
				.append(s("of").text(p.links.max))
		)
		.appendTo(qv);
}
