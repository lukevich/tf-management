import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { throttle } from 'helpers/utils';
import { dispatch } from 'store';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import { SearchInput } from 'components';

import useResetFilter from './hooks/use-reset-filter';

import styles from './styles.scss';

const timeout = 300;

const throttleWrapper = throttle((val, fieldName, action) => {
    dispatch(action({ [fieldName]: val }));
}, timeout);

const Filter = ({ action, placeholder }) => {
    useResetFilter(action);
    const [searchVal, setSearchVal] = useState('');

    const onFieldChange = useCallback((value, fieldName) => {
        throttleWrapper(value, fieldName, action);
        setSearchVal(value);
    }, [action]);

    return (
        <Row className={styles.search__row}>
            <Col md={12} className={styles.search__cell}>
                <SearchInput
                    className={styles.search}
                    onChange={(event) => onFieldChange(event.target.value, 'search')}
                    placeholder={placeholder}
                    value={searchVal}
                />
            </Col>
        </Row>
    );
};

Filter.propTypes = {
    action: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

Filter.defaultProps = {
    placeholder: 'Filter',
};

export default Filter;
