"""
Terraform backend S3 client
"""
import logging
import os

import boto3

s3_client = boto3.client('s3')

logger = logging.getLogger('tf_management.tf_backend.s3')

BUCKET_NAME = os.environ.get('TFSTATE_S3_BUCKET_NAME')
BASE_LOCATION = os.environ.get('TFSTATE_BASE_LOCATION', "")

# Stored destroyed terraform stacks state files are less than 200B
DESTROYED_STACK_TFSTATE_BYTES_BOUND = 200


def list_keys():
    """
    Lists object from BUCKET_NAME s3 bucket under '{base_location}' prefix

    :return: list

    :raises whatever Exception if error occurs while listing objects
    """
    try:
        response = s3_client.list_objects(
            Bucket=BUCKET_NAME,
            Prefix=BASE_LOCATION
        )

        if "Contents" not in response:
            logger.warning("No keys under %s", BASE_LOCATION)
            return []

        return [file["Key"] for file in response["Contents"]
                if file["Key"].endswith(".tfstate") and \
                file["Size"] > DESTROYED_STACK_TFSTATE_BYTES_BOUND]

    except Exception as e:
        logger.exception("Error while listing s3 bucket objects")

        raise e


async def request_file(key):
    """
    Requests file with key 'key' from s3 bucket.

    :return: string, with file content
             None if key is not found
    """
    logger.debug("Looking for '%s' in s3 bucket", key)

    try:
        file_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=key)
        body = file_object['Body'].read().decode('utf-8')

        return body

    except Exception:
        logger.exception("Could not get object %s.", key)

        return None
