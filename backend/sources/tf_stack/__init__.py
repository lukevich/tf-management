"""
Package used to list stacks and collect all its info from configured
terraform backend. Utilizes asyncio and concurrent.futures.ThreadPoolExecutor
for better performance.
"""
import logging

from tf_stack import scanner
from tf_stack import backend

# Logger
logging.getLogger('tf_management.tf_stack.scanner').addHandler(logging.NullHandler())
logging.getLogger('tf_management.tf_stack.constructor').addHandler(logging.NullHandler())
