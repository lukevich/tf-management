"""
Parses metadata file content.
"""
import json
import logging

logger = logging.getLogger('tf_management.parser.metadata')


def parse(metadata_str):
    """
    Parses metadata json file. Extracts metadata and history.

    :param metadata_str: string
    {
        "history": [
            {
                "build_url": string,
                "git_branch_name": string,
                "commit_msg": string,
                "update_ts": int
            },
        ]
    }

    :return: tuple(metadata:dict, history:list)
    """
    try:
        all_metadata = json.loads(metadata_str)

        history = all_metadata["history"]
        metadata = history[0]

        return metadata, history

    except Exception:
        logger.exception("Metadata parsing failed.")

        # Metadata and history can be omitted
        return {}, []
