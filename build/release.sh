#!/bin/sh

if [ ! -d "build/dist" ]; then
  mkdir build/dist
fi

if [ ! -d "build/dist/archive" ]; then
  mkdir build/dist/archive
fi

# Assemble the userscript file from sources.
./build/assemble.sh

# Perform the release by copying the assembled userscript into the dist
# directory
NAME=`cat build/target/name`
VERSION=`cat build/target/version`

cp build/target/${NAME}.userscript.js build/dist/${NAME}.userscript.js
cp build/target/${NAME}.userscript.js build/dist/archive/${NAME}-${VERSION}.userscript.js

# Add artifacts and commit
# TODO Check for clean working state before allowing script to execute
git add build/dist
git ci "[Automated] Releasing version $VERSION"

# Increment package.json version
npm version patch -m "[Automated] Increment to version %s post release"
