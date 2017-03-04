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

echo " - Copying assembled userscript into distribution directory"
cp build/target/${NAME}.user.js build/dist/${NAME}.user.js
cp build/target/${NAME}.user.js build/dist/archive/${NAME}-${VERSION}.user.js

# Add artifacts and commit
# TODO Check for clean working state before allowing script to execute
echo " - Committing changes"
git add build/dist
git commit -m "[Automated] Releasing version $VERSION"
git tag -a "v${VERSION}" -m "[Automated] Tagging version $VERSION"

# Increment package.json version
echo " - Incrementing version"
NEW_VERSION=`npm version --no-git-tag-version patch`

echo " - Committing changes"
git add package.json
git commit -m "[Automated] Incremented to version ${NEW_VERSION}"

echo " - Pushing changes"
git push --follow-tags
