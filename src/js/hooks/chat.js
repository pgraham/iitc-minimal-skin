(function () {
	/**
	 * Extend the chat section with a closed state.
	 */
	"use strict";

	var d = window.plugin.minSkin.helpers.d;
	var el = window.plugin.minSkin.helpers.el;

	window.plugin.minSkin.components.push({
		init: function () {
			var gameLog = d("game-log")
				.append($("#chatcontrols, #chat, #chatinput"))
				.appendTo($("body"));

			var cCtrls = $("#chatcontrols");
			cCtrls.find("a").first().empty().text("▲");

			// Hi-jack expand/collapse butto
			cCtrls.find("a:first").off("click").click(function () {
				gameLog.toggleClass("expanded");
				if (gameLog.is(".expanded")) {
					$(this).text("▼");
				} else {
					$(this).text("▲");
				}
			});

			var closeBtn = el("a", "close-btn")
				.text("✕")
				.prependTo(cCtrls)
				.click(function () {
					gameLog.toggleClass("closed");
					if (gameLog.is(".closed")) {
						closeBtn.text("💬");
					} else {
						closeBtn.text("✕");
					}
				});
		}
	});
}());
