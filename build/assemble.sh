#!/bin/sh
#
# Assemble the userscript from sources. This consists of two steps:
#
#  1. Compile the less sources into a single CSS bundle
#  2. Insert CSS bundle, base64 encoded images and other Javascript sources into 
#     the plugWrap.js template.
#
# The result is output to build/target/iitc-minimal-skin-plugin.user.js
#

if [ -d "build/target" ]; then
  rm -r "build/target"
fi

mkdir -p build/target/work

echo " -- Assembling userscript --"

# Compile less file into CSS
echo "     - Compiling CSS bundle"
lessc "src/less/bundle.less" | cleancss > build/target/work/bundle.css

# Bundle Javascripts
NODE_PATH=src/js browserify src/js/helpers.js > build/target/work/helpers.js

# Assemble compiled CSS into plugin file
NODE_PATH=build/scripts ./build/scripts/assemble.js
