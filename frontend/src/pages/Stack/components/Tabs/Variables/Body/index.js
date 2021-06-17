import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardBodyGrid } from '../../..';

const Body = ({ variables, colsNumber }) => {
    if (!variables) return null;

    return (
        <CardBodyGrid colsNumber={colsNumber} data={variables} />
    );
};

Body.propTypes = {
    colsNumber: PropTypes.number,
    variables: PropTypes.shape({}),
};

Body.defaultProps = {
    colsNumber: undefined,
    variables: null,
};

function mapStateToProps(state) {
    return {
        variables: state.stack.state.variables.data,
    };
}

export default connect(mapStateToProps)(Body);
