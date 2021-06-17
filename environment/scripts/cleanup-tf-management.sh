#!/bin/bash

set -e

# This script performs tf-management tool cleanup.
# Destroys artifacts bucket and cfn template.
#
# Required parameters:
# 'cfn_config_path' - cfn template configuration file path

set -e

cfn_config_path=$1

if [ -z "$cfn_config_path" ]; then
  echo "Cfn config path argument is missing"
  exit 1
fi

unique_string=$(cat "$cfn_config_path" | jq -r '.UniqueString')
artifacts_bucket=$(cat "$cfn_config_path" | jq -r '.ArtifactsS3BucketName')

cfn_stack_name="tf-management-$unique_string"

aws s3 rm "s3://$artifacts_bucket" --recursive
aws s3api delete-bucket --bucket "$artifacts_bucket"

ui_s3_bucket_name=$(aws cloudformation describe-stacks \
  --stack-name "$cfn_stack_name" \
  --query "Stacks[0].Outputs[?OutputKey=='UiS3BucketName'].OutputValue" \
  --output text)

aws s3 rm "s3://$ui_s3_bucket_name" --recursive

echo "Destroying '$cfn_stack_name' cfn stack"
aws cloudformation delete-stack --stack-name "$cfn_stack_name"
