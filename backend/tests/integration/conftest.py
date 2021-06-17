import os

import pytest


@pytest.fixture
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"


@pytest.fixture
def configure_tf_backend():
    os.environ["TFSTATE_S3_BUCKET_NAME"] = "tfstate-bucket"
    os.environ["TF_BACKEND"] = "S3"