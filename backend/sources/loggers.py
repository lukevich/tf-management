"""
Logging configurations
"""
import logging
import os
import sys


def configure():
    stdout_handler = logging.StreamHandler(sys.stdout)

    logging.basicConfig(
        format='[%(asctime)s %(threadName)s] %(name)s  %(levelname)s - %(message)s',
        handlers=[stdout_handler]
    )
    # disable all 3rd party loggers
    logging.getLogger().setLevel(logging.CRITICAL)

    log_level = os.environ.get('LOG_LEVEL', 'INFO')

    logging.getLogger('tf_management').setLevel(log_level)
