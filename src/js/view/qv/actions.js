/**
 * Build actions for a specified portal.
 */
"use strict";

import { d, el } from "util/dom/el";

function buildLinkButton(p) {
	let pUrl = `https://ingress.com/intel?ll=${p.latlng}&z=17&pll=${p.latlng}`;
	let mapsUrl = `https://www.google.com/maps?saddr=My+Location&daddr=${p.latlng}`;

	let pUrls;
	let pUrlsBtn = el("button").text("🔗");

	function removePUrls() {
		if (pUrls.is(".leaving")) {
			return;
		}

		pUrls.on("animationend", () => {
			pUrlsBtn.removeClass("open");
			pUrls.remove();
		});
		pUrls.addClass("leaving");
	}
	
	pUrlsBtn.click(() => {
		if (pUrlsBtn.is(".open")) {
			removePUrls();
		} else {
			pUrlsBtn.addClass("open");

			let urlInput = el("input").val(pUrl);
			pUrls = d("portal-urls")
				.append(urlInput)
				.append(
					el("button").addClass("icon icon-content-copy").click(() => {
						urlInput.select();
						document.execCommand("copy");

						let msg = d("copied-msg").text("Copied!").appendTo(pUrls);
						setTimeout(() => { msg.remove() }, 1000);
					})
				)
				.append(
					el("button").addClass("icon icon-open-in-new").click(() => {
						window.open(pUrl, "_blank");
					})
				)
				.append(
					el("button").addClass("icon icon-gmaps").click(() => {
						window.open(mapsUrl, "_blank");
					})
				)
				.append(el("button").text("✕").click(() => {
					removePUrls();
				}))
				.appendTo("body");
		}
	});

	return pUrlsBtn;
}

export function populateActions(p, qv) {
	qv.empty();
	qv.append(buildLinkButton(p));
}
