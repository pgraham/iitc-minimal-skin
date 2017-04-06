/**
 * Module which exports a function for dynamically creating SVG elements.
 */
"use strict";

function createSvgEl(type, props, children) {
	var el = document.createElementNS("http://www.w3.org/2000/svg", type);

	if (props) {
		for (var attr in props) {
			el.setAttribute(attr, props[attr]);
		}
	}

	if (Array.isArray(children)) {
		children.forEach(function (child) {
			el.appendChild(createSvgEl(child.type, child.props, child.children));
		});
	}

	return el;
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

export default function (viewBox, className) {
	var el = createSvgEl("svg");
	el.setAttribute("viewBox", viewBox);
	domAddClass(el, className);

	function appendChild(type, props, children, className) {
		var child = createSvgEl(type, props, children);
		domAddClass(child, className);
		el.appendChild(child);
		return el;
	}

	el.addPath = function (d, className) {
		return appendChild("path", {
			d: d,
			"vector-effect": "non-scaling-stroke"
		}, [], className);
	};

	el.addCircle = function (c, r, className) {
		return appendChild("circle", {
			cx: c[0],
			cy: c[1],
			r: r,
			"vector-effect": "non-scaling-stroke"
		}, [], className);
	};

	el.append = appendChild;

	el.addClass = function (className) {
		domAddClass(el, className);
	};

	return el;
}
