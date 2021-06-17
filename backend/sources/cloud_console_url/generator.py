"""
Generates resources console URLs.
"""
import logging
from cloud_console_url import type_to_specific_url, base_url
logger = logging.getLogger('tf_management.cloud_console_url.generator')


def generate(resource_type, region, name):
    """
    Generates resource url based on base_url value and
    ui_path if found in resources file

    :param resource_type: string
    :param region: string
    :param name: string

    :return: string
    """
    if resource_type not in type_to_specific_url:
        logger.debug("Resource :%s.%s has no specific url template stored",
                     resource_type, name)

        return None

    path = type_to_specific_url[resource_type].replace(
        "{region}", region).replace("{name}", name)

    return base_url + path
