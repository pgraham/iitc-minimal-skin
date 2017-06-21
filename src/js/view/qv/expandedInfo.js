/**
 * Module which builds the expanded portion of the portal quick view.
 */
"use strict";

import expandedDetails from "view/qv/expandedDetails";

import { d, s } from "util/dom/el";

export function populateExpandedView(p, qv) {
	qv.empty();

	d("image").css("background-image", `url(${p.img})`).appendTo(qv);

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

	expandedDetails.build(p).appendTo(qv);
}
