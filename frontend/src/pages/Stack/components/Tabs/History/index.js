import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Header from './Header';
import Body from './Body';

const History = ({ colsNumber }) => (
    <Card>
        <Header />
        <Body colsNumber={colsNumber} />
    </Card>
);

History.propTypes = {
    colsNumber: PropTypes.number,
};

History.defaultProps = {
    colsNumber: undefined,
};

export default History;
