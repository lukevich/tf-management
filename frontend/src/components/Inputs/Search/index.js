import React from 'react';
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/all';
import { concatCls } from 'helpers/utils';
import Form from 'react-bootstrap/cjs/Form';

import styles from './styles.scss';

const SearchInput = ({ className, placeholder, onChange, value }) => (
    <div className={concatCls(className, styles.input__wrapper)}>
        <BsSearch className={styles.input__icon} />
        <Form.Control
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.input}
        />
    </div>
);

SearchInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

SearchInput.defaultProps = {
    className: '',
    placeholder: '',
    value: '',
    onChange: () => {
    },
};

export default SearchInput;
