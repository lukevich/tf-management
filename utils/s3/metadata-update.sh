#!/bin/bash

set -e

#
# Use this script to download and update metadata file.
#
# Metadata file contains deployment history and current deployment metadata
# as follows (metadata is the first element in history object):
#
# {
#   "history": [
#       {
#           git_branch_name: "{git_branch_name}",
#           commit_msg: "{commit_msg}",
#           build_url: "{build_url}",
#           update_ts: "{update_ts}"
#       }, ...
#   ]
# }
#

tfstate_s3_bucket_name=$1
metadata_s3_key=$2
metadata_file_path=$3
git_branch_name=$4
commit_msg=$5
current_build_url=$6

if [ "$#" -ne "6" ]; then
  echo """
  6 arguments required:
  tfstate_s3_bucket_name, metadata_s3_key, metadata_file_path, git_branch_name, commit_msg, current_build_url
  """
  exit 1
fi

if test -f "$metadata_file_path"; then
  echo "File $metadata_file_path exists. File content will be replaced."
fi

metadata_s3_location="s3://$tfstate_s3_bucket_name/$metadata_s3_key"

echo "Downloading metadata file from '$metadata_s3_location'"

if aws s3 ls "$tfstate_s3_bucket_name/$metadata_s3_key"; then

  aws s3 cp "$metadata_s3_location" "$metadata_file_path"
  echo "Metadata file successfully downloaded"

else
  echo "Metadata file not found in s3 bucket: creating a new metadata file"

  touch "$metadata_file_path"
  echo "{}" >"$metadata_file_path"
fi

update_ts=$(date +%s%3N)
# seconds to milliseconds
if [ "${#update_ts}" -ne "13" ]; then
  update_ts="${update_ts}000"
fi

current_metadata=$(jq -n --arg commit_msg "$commit_msg" \
  --arg git_branch_name "$git_branch_name" \
  --arg build_url "$current_build_url" \
  --argjson update_ts "$update_ts" \
  '{
     git_branch_name: $git_branch_name,
     commit_msg: $commit_msg,
     build_url: $build_url,
     update_ts: $update_ts
    }')

# insert currrent metadata into history beginning
metadata=$(jq --argjson metadata \
  "$current_metadata" '.history |= [ $metadata ] + .' "$metadata_file_path")
echo "$metadata" >"$metadata_file_path"

echo "Metadata file to upload:"
cat "$metadata_file_path"
