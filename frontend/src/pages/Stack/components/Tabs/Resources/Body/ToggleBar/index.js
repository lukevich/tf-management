import React from 'react';
import PropTypes from 'prop-types';

import { concatCls } from 'helpers/utils';
import { TiArrowSortedDown } from 'react-icons/all';
import ListGroup from 'react-bootstrap/cjs/ListGroup';

import styles from './styles.scss';

const ToggleBar = ({ resource, isOpen, onToggle, className }) => (
    <ListGroup.Item className={concatCls(styles.toggle, className)} onClick={() => onToggle(resource.type)}>
        <div>
            {resource.type}
            <span className={styles.count}>
                (
                {resource.data.length}
                )
            </span>
        </div>
        <div className={concatCls(styles.arrow, isOpen && styles.opened)}>
            <TiArrowSortedDown />
        </div>
    </ListGroup.Item>
);

ToggleBar.propTypes = {
    className: PropTypes.string,
    resource: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

ToggleBar.defaultProps = {
    className: '',
};

export default ToggleBar;
