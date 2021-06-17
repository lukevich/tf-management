#!/bin/bash

set -e

#
# Use this script to upload tfvars and metadata files to tfstate bucket.
# Note: must be executed after terraform apply operation
#

tfstate_bucket=$1
tfvars_file_path=$2
tfvars_key=$3
metadata_file_path=$4
metadata_key=$5

if [ "$#" -ne "5" ]; then
  echo "5 arguments required:"
  echo "tfstate_bucket, tfvars_file_path, tfvars_key, metadata_file_path, metadata_key"
  exit 1
fi

echo "Uploading tfvars file to '$tfstate_bucket/$tfvars_key'"
aws s3 cp "$tfvars_file_path" "s3://$tfstate_bucket/$tfvars_key"

echo "Uploading matadata file to '$tfstate_bucket/$metadata_key'"
aws s3 cp "$metadata_file_path" "s3://$tfstate_bucket/$metadata_key"