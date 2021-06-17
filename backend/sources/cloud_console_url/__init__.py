"""
Package for generating resources console URLs.
"""
import logging
import os

import pkg_resources
import yaml

# Logger
logging.getLogger('tf_management.cloud_console_url.generator').addHandler(
    logging.NullHandler())

resources_location_map = {
    'AWS': {
        "base_url": "https://console.aws.amazon.com/",
        "ui_paths": "resources/aws_console_ui_paths.yaml"
    }
}

CLOUD_PROVIDER_TYPE = os.environ.get('CLOUD_PROVIDER_TYPE', 'AWS')

ui_paths = resources_location_map[CLOUD_PROVIDER_TYPE]["ui_paths"]
base_url = resources_location_map[CLOUD_PROVIDER_TYPE]["base_url"]
type_to_specific_url = yaml.safe_load(
    pkg_resources.resource_stream(__name__, ui_paths))
