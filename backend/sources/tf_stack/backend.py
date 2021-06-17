import os

tf_backend_map = {
    'S3': 'tf_backend.s3'
}

TF_BACKEND = os.environ.get('TF_BACKEND', 'S3')

try:
    client = __import__(tf_backend_map[TF_BACKEND], fromlist=[''])
except KeyError:
    raise Exception("Invalid Backend configuration, set 'TF_BACKEND' \
    env variable to one of the following: %s", tf_backend_map.keys())
