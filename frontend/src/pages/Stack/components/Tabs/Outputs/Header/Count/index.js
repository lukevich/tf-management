import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Count = ({ outputs, initialOutputs }) => {
    if (!outputs || !initialOutputs) return null;

    return (
        <h5 className={styles.count}>
            {`(${Object.keys(outputs).length}/${Object.keys(initialOutputs).length})`}
        </h5>
    );
};

Count.propTypes = {
    outputs: PropTypes.shape({}),
    initialOutputs: PropTypes.shape({}),
};

Count.defaultProps = {
    outputs: null,
    initialOutputs: null,
};

function mapStateToProps(state) {
    return {
        initialOutputs: (state.stack.data || {}).outputs || {},
        outputs: state.stack.state.outputs.data,
    };
}

export default connect(mapStateToProps)(Count);
