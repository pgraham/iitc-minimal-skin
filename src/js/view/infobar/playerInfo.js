import getTeamCode from "util/getTeamCode";

import { d } from "util/dom/el";

function buildPlayerLevel() {
	return d("player-level").text(PLAYER.verified_level);
}

function buildPlayerName() {
	return d("player-name")
		.addClass(getTeamCode(PLAYER.team))
		.text(PLAYER.nickname);
}

export function buildPlayerInfo() {
	let genInfo = $("<div/>").addClass("player-info");

	buildPlayerLevel().appendTo(genInfo);
	buildPlayerName().appendTo(genInfo);

	return genInfo;
}
