import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Count = ({ history, initialHistory }) => {
    if (!history || !initialHistory) return null;

    return (
        <h5 className={styles.count}>
            {`(${history.length}/${initialHistory.length})`}
        </h5>
    );
};

Count.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    initialHistory: PropTypes.arrayOf(PropTypes.object),
};

Count.defaultProps = {
    history: null,
    initialHistory: null,
};

function mapStateToProps(state) {
    return {
        initialHistory: (state.stack.data || {}).history || [],
        history: state.stack.state.history.data,
    };
}

export default connect(mapStateToProps)(Count);
