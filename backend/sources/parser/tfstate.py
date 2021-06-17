"""
Parses .tfstate file content.
"""
import json
import logging
from dataclasses import dataclass

import cloud_console_url.generator

logger = logging.getLogger('tf_management.parser.tfstate')


@dataclass
class _ResourceInstance:
    """
    Represents resource instance with the following structure:
    {
          "index_key": int,
          "schema_version": int,
          "attributes": {
                "arn": string,
                "name": string,
                "tags": {
                    "{tag_name}": string
                },
            ...
          },
    }

    """
    name: str
    type: str
    arn: str
    id: str
    url: str

    def to_dict(self):
        return self.__dict__


def _extract_name_from_tags(attributes):
    """
    Extract resource instance name from its attributes

    :param attributes: dict, with the following structure:
    {
            "arn": string,
            "name": string,
            "tags": {
                "{tag_name}": string
            },
            ...
    }
    :return: string
    """
    tag_name = None
    if "tags" in attributes:
        tags = attributes["tags"]

        if tags and "Name" in tags:
            tag_name = tags["Name"]
            logger.debug("Extracting name from tags: %s", tags)

    return tag_name


def _select_aws_name(identifier, name, tag_name):
    """
    Selects aws_name by priority: tag_name, name, id

    :param identifier: string
    :param name: string
    :param tag_name: string

    :return: string
    """
    if tag_name:
        logger.debug("No name found: replacing it with tag_name: %s", tag_name)
        return tag_name

    if name:
        return name

    logger.debug("No name found: replacing it with id: %s", identifier)

    return identifier


def _extract_instance_parameters(attributes):
    """
    Extracts instance parameters. If no name found, replaced with identifier.

    :param attributes: dict, with the following structure:
    {
            "arn": string,
            "name": string,
            "tags": {
                "{tag_name}": string
            },
            ...
    }

    :return: tuple(arn:string, identifier:string, aws_name:string)
    """
    name = None
    arn = None
    identifier = None

    if "arn" in attributes:
        arn = attributes["arn"]

    if "id" in attributes:
        identifier = attributes["id"]

    if "name" in attributes:
        name = attributes["name"]

    tag_name = _extract_name_from_tags(attributes)

    aws_name = _select_aws_name(identifier, name, tag_name)

    return arn, identifier, aws_name


def _construct_aws_resource_instance(tf_type, region, instance):
    """
    Constructs resource instance enriched object

    :param tf_type: string
    :param region: string
    :param instance has the following structure
    {
          "index_key": int,
          "schema_version": int,
          "attributes": {}
    }

    :return: AwsResourceInstance
    """
    try:
        attributes = instance["attributes"]
        arn, identifier, aws_name = _extract_instance_parameters(attributes)
        logger.debug("Attributes found: aws_name:%s , arn: %s, id: %s",
                     aws_name, arn, identifier)

        url = cloud_console_url.generator.generate(tf_type, region, aws_name)
        logger.debug("Resource's url: %s", url)

        return _ResourceInstance(
            name=aws_name, type=tf_type, arn=arn, id=identifier, url=url
        )

    except Exception:
        logger.exception("Skipping resource: %s due to exception", tf_type)

        return None


def _get_enriched_resource_instances(tf_type, region, instances):
    """
    Lists all resource instances as an enriched objects

    :param tf_type: string
    :param region: string
    :param list, with the following structure
    [
        {
          "index_key": int,
          "schema_version": int,
          "attributes": {}
        },
        ...
    ]

    :return: list(AwsResourceInstance)
    """
    resources = []

    for instance in instances:
        resource_instance = _construct_aws_resource_instance(
            tf_type, region, instance)

        if not resource_instance:
            continue

        resources.append(resource_instance)

    return resources


def _get_managed_resources(resources, region):
    """
    Returns all managed resources that are present in .tfstate file

    :param region: string
    :param resources: list:
     [
        {
          "mode": "managed|data",
          "type": string,
          "name": string,
          "provider": string,
          "instances": []
        }
     ]

    :return: list(AwsResourceInstance)
    """
    managed_resources = []
    non_managed_resources = []

    for resource in resources:
        tf_name, tf_type = resource["name"], resource["type"]
        logger.debug("Parsing resource info: %s.%s", tf_type, tf_name)

        # There are cases when a resource has no created instances
        # (no aws_name, id, arn, etc.) skipping
        if "instances" not in resource or len(resource["instances"]) == 0:
            logger.debug("Skipping resource %s.%s: no instances",
                         tf_type, tf_name)
            continue

        enriched_resource_instances = _get_enriched_resource_instances(
            tf_type, region, resource["instances"])

        if "mode" in resource and resource["mode"] == "managed":
            managed_resources.extend(enriched_resource_instances)
        else:
            non_managed_resources.extend(enriched_resource_instances)

    logger.debug("Got non-managed resources: %s", non_managed_resources)

    return managed_resources


def _parse_outputs(outputs_data):
    """
    Parses outputs from .tfstate file

    :param outputs_data: dict
    "output": {
         "value": string,
         "type": string
    }

    :return: dict, with the following structure:
    {
        "{name}": string,
    }
    """
    res_outputs = {}

    for name, value_data in outputs_data.items():
        extracted_value = value_data["value"]

        if isinstance(extracted_value, list):
            extracted_value = ", ".join(extracted_value)

        res_outputs.update({name: extracted_value})

    return res_outputs


def parse(tfstate_file_content_str, region):
    """
    Returns all stacks managed enriched resources instances

    :param region: string
    :param tfstate_file_content_str: string with the following format:
    {
      "version": 4,
      "terraform_version": "0.12.29",
      "serial": 9,
      "lineage": "aabcc9c4-8149-eebe-163b-cf7c48c3cb40",
      "outputs": {
        "{name}": {
          "value": string,
          "type": "string"
        },
      },
      "resources": [
        {
          "mode": "managed|data",
          "type": string,
          "name": string,
          "provider": string,
          "instances": []
        }
      ]
    }

    :return:  tuple(resources:list, outputs:dict),
    with the following structure
    resources:
     [
        {
            "name": string
            "type": string
            "arn": string
            "id": string
            "url": string
        }
    ]

    outputs:
    {
        "{name}": string
    }
    """
    tfstate_file_content = json.loads(tfstate_file_content_str)

    resources_data = tfstate_file_content["resources"]
    managed_resources = _get_managed_resources(resources_data, region)
    resources = [resource.to_dict() for resource in managed_resources]

    outputs_data = tfstate_file_content["outputs"]
    outputs = _parse_outputs(outputs_data)

    return resources, outputs
