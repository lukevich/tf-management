import React from 'react';
import PropTypes from 'prop-types';

import { concatCls } from 'helpers/utils';

import styles from './styles.scss';

const Item = (props) => {
    const { checked, option, onClick, disabled } = props;

    return (
        <div className={concatCls(
            styles.item,
            styles.item__renderer,
            disabled && 'disabled',
        )}
        >
            <input
                type="checkbox"
                onChange={onClick}
                checked={checked}
                tabIndex={-1}
                disabled={disabled}
                className={styles.checkbox}
            />
            <span>{option.label}</span>
        </div>
    );
};

Item.propTypes = {
    checked: PropTypes.bool.isRequired,
    option: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

Item.defaultProps = {
    disabled: false,
};

export default Item;
