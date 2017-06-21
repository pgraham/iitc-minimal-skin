/**
 * Normalize portal/player team property values.
 */
import lookup from "util/lookup";

export default function getTeamCode(team) {
	return lookup(team, {
		"E": "enl",
		"ENLIGHTENED": "enl",
		"R": "res",
		"RESISTANCE": "res",
		"N": "none"
	}, "none");
}
