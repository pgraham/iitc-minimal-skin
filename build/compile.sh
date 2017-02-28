#!/bin/sh

if [ -d "build/target" ]; then
  rm -r "build/target"
fi

mkdir build/target

# Compile less file into CSS
lessc "src/less/bundle.less" "build/target/skin.css"

# Assemble compiled CSS into plugin file
NODE_PATH=build ./build/assemble.js

# Package assembled file for import into Tampermonkey
NODE_PATH=build ./build/package.js
