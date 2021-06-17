"""
Constructs stack using all stack related files (tfstate, tfvars, metadata)
retrieved from backend.
"""
import asyncio
import logging
import os
from dataclasses import dataclass

import parser.metadata
import parser.tfstate
import parser.tfvars
from tf_stack.backend import client

# files must be stored in backend storage with the following keys format:
# 'base_location/region/env_id/file_name', where '/' is a delimiter
TFSTATE_KEY_DELIMITER = os.environ.get('TFSTATE_KEY_DELIMITER', '/')

logger = logging.getLogger('tf_management.tf_stack.constructor')


@dataclass
class Stack:
    """
    Represents stack instance containing info about its
     name, region, environment id,
     deployed terraform resources and outputs,
     terraform variables,
     metadata of the latest deployment
     deployment history
    """
    name: str  # {base_path}-{short_stack_name}-{env_id}
    short_name: str  # name w./o. env_id
    region: str
    env_id: str
    variables: dict
    resources: list
    outputs: dict
    metadata: dict
    history: list

    def to_dict(self):
        return self.__dict__


def _parse_key(key):
    """
    Parses key according to 'base_location/region/env_id/file_name'.

    :return: tuple(base_path:string, region:string, env_id:string, file_name:string)
    """
    base_path, region, env_id, file_name = key.split(TFSTATE_KEY_DELIMITER)

    return base_path, region, env_id, file_name


async def _extract_stack_info(region, tfstate_key):
    """
    Extracts stack info

    :return: tuple(variables:dict, metadata:dict, resources:list,
                    outputs:dict, history:list)
    """
    tfvars_key = tfstate_key.replace(".tfstate", ".tfvars")
    metadata_key = tfstate_key.replace(".tfstate", ".meta")

    tfvars_file_str, metadata_file_str, tfstate_file_str = \
        await asyncio.gather(client.request_file(tfvars_key),
                             client.request_file(metadata_key),
                             client.request_file(tfstate_key))

    variables = parser.tfvars.parse(tfvars_file_str)
    metadata, history = parser.metadata.parse(metadata_file_str)
    resources, outputs = parser.tfstate.parse(tfstate_file_str, region)

    return variables, metadata, resources, outputs, history


def construct_stack(key):
    """
    Creates Stack object by its .tfstate file key in storage

    :return: Stack
    Returns None if unable to extract Stacks info
    """
    if not key.endswith(".tfstate"):
        logger.debug("Not a .tfstate file: %s", key)
        return None

    try:
        logger.debug("Parsing key: %s", key)
        base_path, region, env_id, file = _parse_key(key)

        short_stack_name = file.replace(".tfstate", "")
        full_stack_name = "-".join([base_path, short_stack_name, env_id])

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        variables, metadata, resources, outputs, history = loop.run_until_complete(
            _extract_stack_info(region, key))
        loop.close()

        stack = Stack(
            name=full_stack_name,
            short_name=f"{base_path}-{short_stack_name}",
            region=region,
            env_id=env_id,
            metadata=metadata,
            variables=variables,
            outputs=outputs,
            resources=resources,
            history=history
        )
        logger.debug("Adding stack info to stacks, stack: %s", stack.name)
        logger.debug("Stack full info: %s", stack.to_dict())

        return stack

    except Exception:
        logger.exception("Unable to process stack %s info.", key)

        return None
