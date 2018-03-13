# IITC Skin

A skin for IITC that minimizes chrome, emphasizing the map as much as possible.

## Install

Install latest as a Greasemonkey or Tampermonkey script from
[build/dist directory](build/dist/iitc-minimal-skin.user.js).

## Development Flow

 0. Clone, run `$ npm install`.
 1. Make changes.
 2. Run build: `$ npm run build`.
 3. Install one of the artifacts in _build/target_ as GM/TM script.
     -  _iitc-minimal-skin.user.js_ is a normal userscript.
     -  _iitc-minimal-skin.js_ is the `user.js` file encoded for use with
        Tampermonkey's file import utility.
