/**
 * This module exports an SVG element for the background of the outbound links
 * section of portal quick view.
 */
"use strict";

import svg from "util/dom/svg";

export function buildLinksImg(l, r) {
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
