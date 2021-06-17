import React from 'react';
import PropTypes from 'prop-types';
import * as toastr from 'toastr';

import { copyTextToClipboard, concatCls } from 'helpers/utils';
import { FaRegCopy } from 'react-icons/fa';

import styles from './styles.scss';

const Copy = ({ className, copyText, children }) => {
    const onCopy = () => {
        copyTextToClipboard(copyText, (success, error) => {
            if (error) {
                return toastr.error(error.message);
            }

            return toastr.success('Copied to clipboard!');
        });
    };

    return (
        <div onClick={onCopy} className={concatCls(styles.copy, className)}>
            {children || <FaRegCopy />}
        </div>
    );
};

Copy.propTypes = {
    copyText: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

Copy.defaultProps = {
    copyText: '',
    className: '',
    children: undefined,
};

export default Copy;
