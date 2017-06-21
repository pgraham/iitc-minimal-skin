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
		"digits": false,
		"getDataZoomForMapZoom": false,
		"getMapZoomTileParameters": false,
		"COLORS_LVL": false,
		"RESO_NRG": false,
		"PLAYER": false,
		"TEAM_ENL": false,
		"TEAM_RES": false,
		"teamStringToId": false,
		"getPortalFieldsCount": false,
		"getPortalLinksCount": false
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"rules": {
		"semi": [ "error", "always", { "omitLastInOneLineBlock": true } ],
		"indent": [ "error", "tab", { "SwitchCase": 1 } ]
	}
};
