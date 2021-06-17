import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Header from './Header';
import Body from './Body';

const Outputs = ({ colsNumber }) => (
    <Card>
        <Header />
        <Body colsNumber={colsNumber} />
    </Card>
);

Outputs.propTypes = {
    colsNumber: PropTypes.number,
};

Outputs.defaultProps = {
    colsNumber: undefined,
};

export default Outputs;
