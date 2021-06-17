import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SmoothCollapse from 'react-smooth-collapse';

import { concatCls } from 'helpers/utils';

import styles from './styles.scss';

const Collapse = ({ children, open, allowOverflowWhenOpen, className, ...props }) => (
    <SmoothCollapse
        className={concatCls(styles.collapse, className)}
        expanded={open}
        allowOverflowWhenOpen={allowOverflowWhenOpen}
        {...props}
    >
        {children}
    </SmoothCollapse>
);

Collapse.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    allowOverflowWhenOpen: PropTypes.bool,
    className: PropTypes.string,
};

Collapse.defaultProps = {
    className: '',
    allowOverflowWhenOpen: false,
};

export default memo(Collapse);
