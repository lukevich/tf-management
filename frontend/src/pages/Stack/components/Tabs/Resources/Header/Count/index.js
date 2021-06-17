import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles.scss';

const Count = ({ resources, initialResources }) => {
    if (!resources || !initialResources) return null;

    return (
        <h5 className={styles.count}>
            {`(${resources.length}/${initialResources.length})`}
        </h5>
    );
};

Count.propTypes = {
    resources: PropTypes.arrayOf(PropTypes.object),
    initialResources: PropTypes.arrayOf(PropTypes.object),
};

Count.defaultProps = {
    resources: null,
    initialResources: null,
};

function mapStateToProps(state) {
    return {
        initialResources: (state.stack.data || {}).resources || [],
        resources: state.stack.state.resources.data,
    };
}

export default connect(mapStateToProps)(Count);
