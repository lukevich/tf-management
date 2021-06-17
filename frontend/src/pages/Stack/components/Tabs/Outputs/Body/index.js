import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardBodyGrid } from '../../..';

const Body = ({ outputs, colsNumber }) => {
    if (!outputs) return null;

    return (
        <CardBodyGrid colsNumber={colsNumber} data={outputs} />
    );
};

Body.propTypes = {
    outputs: PropTypes.shape({}),
    colsNumber: PropTypes.number,
};

Body.defaultProps = {
    outputs: null,
    colsNumber: undefined,
};

function mapStateToProps(state) {
    return {
        outputs: state.stack.state.outputs.data,
    };
}

export default connect(mapStateToProps)(Body);
