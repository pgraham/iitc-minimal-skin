/**
 * Module which builds the expanded portion of the portal quick view.
 */
"use strict";

import expandedDetails from "view/qv/expandedDetails";

import { d, s, el } from "util/dom/el";

function openLightbox(url) {
	const lb = d("lightbox")
		.click(() => lb.remove())
		.append(el("img").attr("src", url))
		.append(
			el("button")
			.text("✕")
			.click(e => {
				e.preventDefault();
				lb.remove();
			})
		).appendTo("body");
}

export function populateExpandedView(p, qv) {
	qv.empty();

	d("image")
		.css("background-image", `url(${p.img})`)
		.click(() => {
			openLightbox(p.img);
		})
		.appendTo(qv);

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
