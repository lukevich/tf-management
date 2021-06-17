#!/bin/bash

# This script performs full flow tf-management tool deployment.
#
# To configure:
# - update 'environment/config/cfn.config.json' file with
#   your cfn parameters values
# - update AWS_DEFAULT_REGION and AWS_PROFILE env variables before
#   running this script
#
# Required parameters:
#
# 'cfn_config_path' - cfn template configuration file path

set -e

cfn_config_path=$1

if [ -z "$cfn_config_path" ]; then
  echo "Cfn config path argument is missing"
  exit 1
fi

# script dir
tf_management_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

echo
echo "======================= Validating required tools ======================"
aws --version
jq --version

echo
echo "========================= Configuring deployment ======================="
# extract all cfn stack parameters in the following format: key=value
cfn_config=$(cat "$cfn_config_path" |
  jq -r '. | keys[] as $key | "\($key)=\(.[$key])"')

# extract specific cfn config parameters
domain_name=$(cat "$cfn_config_path" | jq -r '.DomainName')
hosted_zone_domain_name=$(cat "$cfn_config_path" | jq -r '.HostedZoneDomainName')
unique_string=$(cat "$cfn_config_path" | jq -r '.UniqueString')
artifacts_bucket_name=$(cat "$cfn_config_path" | jq -r '.ArtifactsS3BucketName')
artifacts_bucket_backend_sources_key=$(cat "$cfn_config_path" |
  jq -r '.ArtifactsS3TfManagementLambdaKey')

cfn_stack_name="tf-management-$unique_string"

echo "Deployment successfully configured"

echo
echo "======================= Creating artifacts bucket ======================"
if aws s3 ls "s3://$artifacts_bucket_name" 2>&1 | grep -q 'NoSuchBucket'; then
  echo "Creating bucket $artifacts_bucket_name"
  aws s3 mb "s3://$artifacts_bucket_name"

else
  echo "Bucket '$artifacts_bucket_name' already exists"
fi

echo
echo "====================== Uploading lambda artifacts ======================"
aws s3 cp "$tf_management_dir/backend.zip" \
  "s3://$artifacts_bucket_name/$artifacts_bucket_backend_sources_key"

echo
echo "===================== Deploying/updating cfn stack ====================="
cfn_dir="$tf_management_dir/cloudformation"

aws cloudformation deploy \
  --template-file "$cfn_dir/tf-management.template" \
  --stack-name "$cfn_stack_name" \
  --capabilities "CAPABILITY_IAM" \
  --parameter-overrides $cfn_config

# extracting UI S3 bucket name
ui_s3_bucket_name=$(aws cloudformation describe-stacks \
  --stack-name "$cfn_stack_name" \
  --query "Stacks[0].Outputs[?OutputKey=='UiS3BucketName'].OutputValue" \
  --output text)

#  make sure lambda sources are up-to-date
aws lambda update-function-code \
  --function-name "tf-management-$unique_string" \
  --s3-bucket "$artifacts_bucket_name" \
  --s3-key "$artifacts_bucket_backend_sources_key"

echo
echo "============================ Configuring UI ============================"
ui_dist="$tf_management_dir/dist"

configData=$(jq -n \
  --arg url "https://$domain_name.$hosted_zone_domain_name" \
  '{api: {data: $url}}')
(echo "$configData" | jq .) >"$ui_dist/config.json"

echo "UI config:"
cat "$ui_dist/config.json"

echo
echo "============================= Uploading UI ============================="
aws s3 cp "$ui_dist" "s3://$ui_s3_bucket_name" --acl public-read --recursive
