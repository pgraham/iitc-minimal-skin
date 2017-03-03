#!/usr/bin/env node
/**
 * Get the current version of the script and output it to stdout
 */
"use strict";

const pkg = require("../../package.json");
console.log(pkg.version);
