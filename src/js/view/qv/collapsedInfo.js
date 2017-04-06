/**
 * Module which builds the collapsed portion of the portal quick view.
 */
"use strict";

import format from "util/format";
import { d, s } from "util/dom/el";

import { buildLinksImg } from "view/qv/linksBg";

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
