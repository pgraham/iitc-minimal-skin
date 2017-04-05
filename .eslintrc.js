module.exports = {
	"extends": "eslint:recommended",
	"env": {
		"browser": true,
		"jquery": true
	},
	"globals": {
		"require": true,
		"android": false,
		"map": false,
		"getDataZoomForMapZoom": false,
		"getMapZoomTileParameters": false,
		"getMaxOutgoingLinks": false,
		"COLORS_LVL": false,
		"RESO_NRG": false
	},
	"rules": {
		"semi": [ "error", "always", { "omitLastInOneLineBlock": true } ],
		"indent": [ "error", "tab", { "SwitchCase": 1 } ]
	}
};
