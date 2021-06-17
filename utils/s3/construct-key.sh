#!/bin/bash

set -e

#
# Use this script to construct tfstate, tfvars, metadata s3 keys
# Note: filename parameter must follow the pattern: {stack_name}.{tfstate|tfvars|meta}
#

base_path=$1
region=$2
env_id=$3
filename=$4

if [ "$#" -ne "4" ]; then
  echo "4 arguments required:"
  echo "base_path, region, env_id, filename"
  exit 1
fi

filename_pattern="\S+\.(tfstate|tfvars|meta)$"
if ! [[ "$filename" =~ $filename_pattern ]]; then
    echo "Invalid filename, must follow the pattern: {stack_name}.{tfstate|tfvars|meta}"
    exit 1
fi

key="$base_path/$region/$env_id/$filename"
echo "$key"
