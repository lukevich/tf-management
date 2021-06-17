import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'react-multi-select-component';

import { concatCls } from 'helpers/utils';
import Item from './Item';
import Value from './Value';

import styles from './styles.scss';
import './styles.notmodule.scss';

const MultiSelectComponent = (props) => {
    const { className, value, onChange, options } = props;

    const valueRenderer = useCallback((selected) => (
        <Value selected={selected} />
    ), []);

    const ItemRenderer = useCallback((params) => (
        <Item {...params} />
    ), []);

    const filterOptions = useCallback((opts, filter) => {
        if (!filter) {
            return opts;
        }
        const re = new RegExp(filter, 'i');
        return opts.filter(({ value: val }) => val && val.match(re));
    }, []);

    return (
        <div className={concatCls(styles.multiselect, className)}>
            <MultiSelect
                className={concatCls(styles.input, 'multiselect')}
                valueRenderer={valueRenderer}
                ItemRenderer={ItemRenderer}
                options={options}
                value={value}
                labelledBy="Select"
                onChange={onChange}
                filterOptions={filterOptions}
            />
        </div>
    );
};

MultiSelectComponent.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
};

MultiSelectComponent.defaultProps = {
    className: '',
};

export default MultiSelectComponent;
