#!/bin/sh

# Assemble the userscript file from sources.
./build/assemble.sh

# Package assembled file for import into Tampermonkey
NODE_PATH=build/scripts ./build/scripts/prepare-for-import.js
