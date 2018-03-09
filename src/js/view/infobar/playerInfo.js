import getTeamCode from "util/getTeamCode";
import { percent as fmtPct } from "util/format";

import { d, s } from "util/dom/el";

function getXmPct() {
	let xmMax = parseInt(PLAYER.xm_capacity, 10);
	return PLAYER.energy / xmMax;
}

function getApPct() {
	let targetAp = parseInt(PLAYER.min_ap_for_next_level, 10);
	if (!targetAp) {
		return NaN;
	}

	let curAp = parseInt(PLAYER.ap, 10);
	let prevAp = parseInt(PLAYER.min_ap_for_current_level, 10);

	let lvlAp = targetAp - prevAp;
	let progress = curAp - prevAp;

	return progress / lvlAp;
}

function buildPlayerLevel() {
	return d("player-level").text(PLAYER.verified_level);
}

function buildPlayerName() {
	return d("player-name")
		.addClass(getTeamCode(PLAYER.team))
		.text(PLAYER.nickname);
}

function buildPlayerStatus() {
	let xmPct = getXmPct();
	let apPct = getApPct();
	return d("player-status")
		.append(
			d("ap-level")
				.append(s("lbl").text("AP"))
				.append(s("val").text(fmtPct(apPct)))
				.append(s("bar").width(`${apPct * 100}%`))
		)
		.append(
			d("xm-level")
				.append(s("lbl").text("XM"))
				.append(s("val").text(fmtPct(xmPct)))
				.append(s("bar").width(`${xmPct * 100}%`))
		);
}

export function buildPlayerInfo() {
	let genInfo = $("<div/>").addClass("player-info");

	buildPlayerLevel().appendTo(genInfo);
	buildPlayerName().appendTo(genInfo);
	buildPlayerStatus().appendTo(genInfo);

	return genInfo;
}
