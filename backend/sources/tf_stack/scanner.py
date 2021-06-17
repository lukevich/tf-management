"""
Lists all stacks using asyncio and concurrent.futures.ThreadPoolExecutor
for better performance.
"""
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

from tf_stack.backend import client
from tf_stack.constructor import construct_stack

# value of 15 is the best for 1024Mb lambda memory size configuration
executor = ThreadPoolExecutor(max_workers=15)

logger = logging.getLogger('tf_management.tf_stack.scanner')


async def list_all():
    """
    Lists all stacks from configured terraform backend using ThreadPoolExecutor

    :return: dict, with the following structure:
    {
        "stacks": [
            {
                "name": string
                "short_name": string
                "region": string
                "env_id": string
                "variables": {
                    "{key}": string
                },
                "resources": [
                    {
                        "name": string
                        "type": string
                        "arn": string
                        "id": string
                        "url": string
                    }
                ],
                "outputs": {
                    "{name}": string
                },
                "metadata": {
                    "build_url": string,
                    "git_branch_name": string,
                    "commit_msg": string,
                    "update_ts": int
                },
                "history": [
                    {
                        "build_url": string,
                        "git_branch_name": string,
                        "commit_msg": string,
                        "update_ts": int
                    },
                ]
            },
        ]
    }
    """
    keys_list = client.list_keys()
    all_stacks = []

    future_list = []
    for key in keys_list:
        future = executor.submit(construct_stack, key)
        future_list.append(future)

    for stack_task in as_completed(future_list, timeout=60):
        stack = stack_task.result()
        all_stacks.append(stack)

    converted_stacks = [stack.to_dict() for stack in all_stacks if
                        stack is not None]

    return {"stacks": converted_stacks}
