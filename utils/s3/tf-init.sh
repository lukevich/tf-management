#!/bin/bash

set -e

#
# Use this script to initialize terraform directory
# Note: must be executed within terraform dir
#

tfstate_bucket=$1
tfstate_s3_key=$2
tfstate_s3_region=$3
dynamodb_table=$4

if [ "$#" -ne "4" ]; then
  echo "4 arguments required:"
  echo "tfstate_bucket, tfstate_s3_key, tfstate_s3_region. dynamodb_table"
  exit 1
fi

echo "Initializing terraform, bucket: '$tfstate_bucket', key: '$tfstate_s3_key'"

terraform init \
  -backend-config "bucket=$tfstate_bucket" \
  -backend-config "key=$tfstate_s3_key" \
  -backend-config "region=$tfstate_s3_region" \
  -backend-config "dynamodb_table=$dynamodb_table"
