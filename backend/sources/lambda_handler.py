"""
Lambda function used to retrieve all info about deployed terraform stacks
"""
import asyncio
import json
import logging

import tf_stack
import loggers

logger = logging.getLogger("tf_management")
loggers.configure()


def lambda_handler(event, context):
    """
    Lambda function is triggered by API Gateway.
    Doesn't rely on even or context.

    :return: dict, with the following structure:
        {
            'statusCode': int,
            'body': string,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }
    """
    try:
        logger.debug("Received event: %s", json.dumps(event))

        stacks = asyncio.run(tf_stack.scanner.list_all())

        logger.debug("Got stacks: %s", json.dumps(stacks))

        sorted_stacks = sorted(stacks['stacks'], key=lambda stack: (
            stack["region"], stack["env_id"], stack["name"]))
        stacks['stacks'] = sorted_stacks

        return build_response(200, stacks)
    except Exception as e:
        logger.exception("Lambda execution failed.")

        return build_response(500, {"Error": str(e)})


def build_response(status_code, body_obj):
    """
    Builds lambda_handler response with Access-Control-Allow-Origin header

    :return: dict
    """

    return {
        'statusCode': status_code,
        'body': json.dumps(body_obj),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    }


def extract_query_parameter(event, parameter_name):
    """
    Extracts query_parameter from event's queryStringParameters.

    :return: string
     Returns None, if none found
    """
    if event and 'queryStringParameters' in event and \
            event['queryStringParameters']:
        query_parameter = event['queryStringParameters'].get(parameter_name)

        logger.info("Found query parameter %s: %s", parameter_name,
                    query_parameter)

        return query_parameter

    return None


def extract_query_region(event):
    """
    Extracts 'query_region' param from event's queryStringParameters.

    :return: string
     Returns None, if none found
    """
    return extract_query_parameter(event, "region")


def extract_base_location(event):
    """
    Extracts 'base_location' param from event's queryStringParameters.

    :return: string
     Returns None, if none found
    """
    query_base_location = extract_query_parameter(event, "base_location")

    if query_base_location:
        return query_base_location.replace("/", "")

    return ""

