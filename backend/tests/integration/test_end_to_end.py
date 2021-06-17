import json
import os

import boto3
import pytest
from moto import mock_s3

fixtures_dir = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "../fixtures")


def put_all_fixtures_to_s3(bucket, s3):
    s3_objects_dir = os.path.join(fixtures_dir, "s3_objects")

    for file in os.listdir(s3_objects_dir):
        s3.put_object(
            Body=open(os.path.join(s3_objects_dir, file), "rb"),
            Bucket=bucket,
            Key=f"base_location/region/env_id/{file}"
        )


@pytest.fixture
def s3_client(aws_credentials, configure_tf_backend):
    with mock_s3():
        bucket_name = os.environ["TFSTATE_S3_BUCKET_NAME"]
        s3 = boto3.client("s3", region_name="us-east-1")
        s3.create_bucket(Bucket=bucket_name)

        put_all_fixtures_to_s3(bucket_name, s3)
        yield s3


def verify_first_stack_info(stack):
    expected = json.load(open(
        os.path.join(fixtures_dir, "responses/stack1.json")))
    verify(stack, expected)


def verify_second_stack_info(stack):
    expected = json.load(open(
        os.path.join(fixtures_dir, "responses/stack2.json")))
    verify(stack, expected)


# TODO iterate over stack dict instead of comparing each separately
def verify(stack, expected):
    assert stack["name"] == expected["name"]
    assert stack["short_name"] == expected["short_name"]
    assert stack["region"] == expected["region"]
    assert stack["env_id"] == expected["env_id"]
    assert sorted(stack["resources"],
                  key=lambda resource: (resource["type"], resource["name"])) == \
           sorted(expected["resources"],
                  key=lambda resource: (resource["type"], resource["name"]))
    assert stack["outputs"] == expected["outputs"]
    assert stack["variables"] == expected["variables"]
    assert stack["metadata"] == expected["metadata"]
    assert sorted(stack["history"], key=lambda item: (item["update_ts"])) == \
           sorted(expected["history"], key=lambda item: (item["update_ts"]))


def test_end_to_end(aws_credentials, s3_client, configure_tf_backend):
    from .context import tf_management

    response = tf_management(event=None, context=None)["body"]
    stacks = json.loads(response)["stacks"]

    assert len(stacks) == 2

    verify_first_stack_info(stacks[0])
    verify_second_stack_info(stacks[1])
