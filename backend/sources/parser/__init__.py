"""
Parser for .tfstate files, .tfvars files,
metadata files (containing latest stack deployment info and deployment history).
"""
import logging

# Loggers
logging.getLogger('tf_management.parser.metadata').addHandler(logging.NullHandler())
logging.getLogger('tf_management.parser.variables').addHandler(logging.NullHandler())
logging.getLogger('tf_management.parser.tfvars').addHandler(logging.NullHandler())
