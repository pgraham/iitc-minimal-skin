/**
 * Module which builds the details collumn of the expanded portal details view.
 */
import fmt from "util/format";
import getTeamCode from "util/getTeamCode";
import { d, s } from "util/dom/el";

const fmtInvl = window.formatInterval;
const fmtNrg = window.prettyEnergy;

class ExpandedDetailsBuilder {

	getAttackInfo(attack) {
		if (!attack.freq && !attack.hit && !attack.force) {
			return $();
		}

		let el = d("attack");
		if (attack.freq) {
			el.append(
				d("attack-mod")
					.append(s("freq-lbl").text("Frequency"))
					.append(s("freq").text(`×${attack.freq}`))
			);
		}
		if (attack.hit) {
			el.append(
				d("attack-mod")
					.append(s("hit-lbl").text("Hit bonus"))
					.append(s("hit").text(`${attack.hit}%`))
			);
		}
		if (attack.force) {
			el.append(
				d("attack-mod")
					.append(s("force-lbl").text("Force"))
					.append(s("force").text(`×${attack.force}`))
			);
		}
		return el;
	}

	getHackInfo(hacks) {
		let cooldown = fmtInvl(hacks.cooldown);
		let burnout = fmtInvl(hacks.burnout);
		return `${hacks.hacks}@${cooldown} (${burnout})`;
	}

	getLinkRange(range) {
		return `${fmt.distance(range.range)} range`;
	}

	getNrgInfo(nrg) {
		return `${fmtNrg(nrg.current)}/${fmtNrg(nrg.total)}`;
	}

	buildDetail(type, icon, content) {
		return d(type).addClass(`icon ${icon}`).text(content);
	}

	getIconClass(type, team) {
		return `icon-${type}-${team}`;
	}

	build(p) {
		let deets = d("details");
		if (p.owner.team === "none") {
			return deets;
		}

		let team = getTeamCode(PLAYER.team);

		this.buildDetail(
			"hacks",
			this.getIconClass("hack", team),
			this.getHackInfo(p.hacks)
		).appendTo(deets);

		this.buildDetail(
			"range",
			this.getIconClass("link", team),
			this.getLinkRange(p.range)
		).appendTo(deets);

		this.buildDetail(
			"nrg",
			this.getIconClass("nrg", team),
			this.getNrgInfo(p.nrg)
		).appendTo(deets);

		this.buildDetail(
			"fields",
			this.getIconClass("field", team),
			p.links.fields
		).appendTo(deets);

		this.getAttackInfo(p.attack).appendTo(deets);

		return deets;
	}
}

export default new ExpandedDetailsBuilder();
