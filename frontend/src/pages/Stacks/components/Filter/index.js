import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dispatch } from 'store';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import { stacksFilterAction } from 'store/actions';
import { SearchInput, MultiSelect } from 'components';

import styles from './styles.scss';

const Filter = ({ data, filter }) => {
    const onFieldChange = useCallback((value, fieldName) => {
        dispatch(stacksFilterAction({ [fieldName]: value }));
    }, []);

    const regionOptions = useMemo(() => {
        const regions = data.map((d) => d.region);
        const uniqueRegions = [...new Set(regions)];

        return uniqueRegions.map((region) => ({
            label: region,
            value: region,
        }));
    }, [data]);

    return (
        <Row>
            <Col md={3} className={styles.search__cell}>
                <SearchInput
                    className={styles.search}
                    onChange={(event) => onFieldChange(event.target.value, 'search')}
                    placeholder="Filter by stack name"
                    value={filter.search}
                />
            </Col>
            <Col md={3} className={styles.regions}>
                <MultiSelect
                    onChange={(value) => onFieldChange(value, 'regions')}
                    className={styles.regions}
                    value={filter.regions}
                    options={regionOptions}
                />
            </Col>
        </Row>
    );
};

function mapStateToProps(state) {
    return {
        filter: state.stacks.state.filter,
        data: state.stacks.data,
    };
}

Filter.propTypes = {
    filter: PropTypes.shape({
        search: PropTypes.string,
        regions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })),
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Filter);
