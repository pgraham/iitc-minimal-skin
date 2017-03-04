(function () {

	function createSvgEl(type) {
		return document.createElementNS("http://www.w3.org/2000/svg", type);
	}

	function domAddClass(el, className) {
		if (!className) {
			return;
		}

		if (Array.isArray(className)) {
			className.forEach(function (cls) {
				domAddClass(el, cls);
			});
		} else {
			el.classList.add(className);
		}
	}

	var h = {};

	/**
	 * Generic lookup
	 */
	h.match = function (value, values, def) {
		if (values[value]) {
			return values[value];
		}
		return def;
	};

	/**
	 * Shorthand to create a jQuery object with a single className.
	 */
	h.el = function (type, className) {
		return $("<" + type + "/>").addClass(className);
	};

	/**
	 * Shorthand to create a <div/> element jQuery object with the given
	 * className.
	 */
	h.d = function (className) {
		return h.el("div", className);
	};

	/**
	 * Shorthand to create a <span/> element jQuery object with the given
	 * className.
	 */
	h.s = function (className) {
		return h.el("span", className);
	};

	/**
	 * Create a new <svg/> element with some shorthand functions attached.
	 */
	h.svg = function (viewBox, className) {
		var el = createSvgEl("svg");
		el.setAttribute("viewBox", viewBox);
		domAddClass(el, className);

		el.addPath = function (d, className) {
			var path = createSvgEl("path");
			path.setAttribute("d", d);
			path.setAttribute("vector-effect", "non-scaling-stroke");
			domAddClass(path, className);

			el.appendChild(path);
			return el;
		};

		el.addClass = function (className) {
			domAddClass(el, className);
		};

		return el;
	};

	window.plugin.minSkin.helpers = h;
}());
