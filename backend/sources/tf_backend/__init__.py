"""
Package contains terraform backend clients. Each new backend client must
implement two methods: list_objects(), request_file(key).

- list_keys must return list keys (non-empty .tfstate files)

- request_file(key) must return ascii decoded string with file content
"""
import logging

# Logger
logging.getLogger('tf_management.tf_backend.s3').addHandler(logging.NullHandler())
