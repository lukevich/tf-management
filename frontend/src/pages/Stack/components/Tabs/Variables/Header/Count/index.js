import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Count = ({ variables, initialVariables }) => {
    if (!variables || !initialVariables) return null;

    return (
        <h5 className={styles.count}>
            {`(${Object.keys(variables).length}/${Object.keys(initialVariables).length})`}
        </h5>
    );
};

Count.propTypes = {
    variables: PropTypes.shape({}),
    initialVariables: PropTypes.shape({}),
};

Count.defaultProps = {
    variables: null,
    initialVariables: null,
};

function mapStateToProps(state) {
    return {
        initialVariables: (state.stack.data || {}).variables || {},
        variables: state.stack.state.variables.data,
    };
}

export default connect(mapStateToProps)(Count);
