import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Header from './Header';
import Body from './Body';

const Variables = ({ colsNumber }) => (
    <Card>
        <Header />
        <Body colsNumber={colsNumber} />
    </Card>
);

Variables.propTypes = {
    colsNumber: PropTypes.number,
};

Variables.defaultProps = {
    colsNumber: undefined,
};

export default Variables;
