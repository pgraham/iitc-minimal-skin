/**
 * Module which exports short hand functions for create elements using jQuery.
 */
"use strict";

/**
 * Shorthand to create a jQuery object with a single className.
 */
export function el(type, className) {
	return $("<" + type + "/>").addClass(className);
}

/**
 * Shorthand to create a <div/> element jQuery object with the given
 * className.
 */
export function d(className) {
	return el("div", className);
}

/**
 * Shorthand to create a <span/> element jQuery object with the given
 * className.
 */
export function s(className) {
	return el("span", className);
}
