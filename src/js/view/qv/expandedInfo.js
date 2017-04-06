/**
 * Module which builds the expanded portion of the portal quick view.
 */
"use strict";

import { d, s } from "util/dom/el";

export function populateExpandedView(p, qv) {
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
