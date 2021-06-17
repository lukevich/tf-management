"""
Parses .tfvars file content.
"""
import logging

logger = logging.getLogger('tf_management.parser.tfvars')


def parse(tfvars_file_str):
    """
    Extracts variables from {stack}.tfvars file

    :param tfvars_file_str: string with in following format:
        env_id = "dev"
        region = "us-east-1"
        list_var = [
        "value1", "value2"
        ]


    :return: dict, with the following structure:
    {
        "{key}": string
    }
    """
    tfvars_body = tfvars_file_str.replace("\"", "")
    variables = tfvars_body.split("\n")
    res_variables = _parse_to_dict(variables)

    return res_variables


def _parse_to_dict(variables):
    """
    Extracts variables data (handling multiline variables)

    :param variables: list, representing lines of file
    with the following structure:
        env_id = "dev"
        region = "us-east-1"
        list_var = [
        "value1", "value2"
        ]

    :return: dict, with the following structure:
    {
        "{key}": string,
    }
    """
    vars_dict = {}

    continue_collecting_variable_values = False
    prev_key = None
    prev_value = None

    for var in variables:

        if var.strip() == "":
            continue

        if "=" not in var:
            continue_collecting_variable_values = True
            prev_value += f" {var.strip()}"

        if continue_collecting_variable_values:
            prev_value = _remove_brackets_and_strip(prev_value)
            vars_dict.update({prev_key: prev_value})
            continue_collecting_variable_values = False
            continue

        tfvars_key, value = var.split("=")
        prev_key = tfvars_key = tfvars_key.strip()
        prev_value = value

        value = _remove_brackets_and_strip(value)
        vars_dict.update({tfvars_key: value})

    return vars_dict


def _remove_brackets_and_strip(value):
    """
    Removes brackets from list variables

    :param value: string

    :return: value: string
    """
    value = value.replace("[", "")
    value = value.replace("]", "")

    return value.strip()
