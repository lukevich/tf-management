#!/bin/bash

set -e

tf_management_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
artifacts_dir="$tf_management_dir/artifacts"
mkdir "$artifacts_dir"

echo
echo "======================= Validating required tools ======================"
pip3 --version
npm --version

echo
echo "====================== Building lambda artifacts ======================="
backend_sources_dir="$tf_management_dir/backend/sources"
build_dir="$tf_management_dir/backend/build"

# zip source files
mkdir "$build_dir"
pushd "$backend_sources_dir" && zip -r "$artifacts_dir/backend.zip" ./* && popd

# install and zip dependencies
pip3 install -r "$backend_sources_dir/requirements.txt" -t "$build_dir/libs/"
pushd "$build_dir/libs" && zip -ur "$artifacts_dir/backend.zip" ./* && popd

# cleanup
rm -rf "$build_dir"

echo
echo "============================ Building UI ==============================="
ui_dir="$tf_management_dir/frontend"
ui_dist="$ui_dir/dist"

pushd "$ui_dir"
npm install
npm run-script build
popd

echo
echo "========================= Building artifacts ============================"
cp -r "$ui_dist" "$artifacts_dir"
cp -r "$tf_management_dir/utils" "$artifacts_dir"
cp -r "$tf_management_dir/environment/cloudformation" "$artifacts_dir"
cp "$tf_management_dir/environment/scripts"/* "$artifacts_dir/"

pushd "$artifacts_dir" && zip -r "$tf_management_dir/tf-management.zip" ./* && popd

rm -rf "$artifacts_dir"