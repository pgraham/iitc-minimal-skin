window.plugin.minSkin.hooks.push({
	event: "portalDetailsUpdated",
	handler: function () {
		var el = $("#portaldetails");

		// Get rid of some of the overwhelming amount of brightness
		if (el.is(".enl")) {
			el.removeClass("enl");
			el.find("#level").addClass("enl");
		} else if (el.is(".res")) {
			el.removeClass("res");
			el.find("#level").addClass("res");
		}

		el.find(".mods").children().each(function () {
			var modName = $(this).text().toLowerCase().replace(/\s+/g, "-");

			$(this).addClass("mod").empty();
			if (modName) {
				$(this).append($("<div/>").addClass(modName));
			}
		});
	}
});
