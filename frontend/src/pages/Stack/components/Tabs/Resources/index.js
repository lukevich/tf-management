import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Header from './Header';
import Body from './Body';

const Resources = ({ colsNumber }) => (
    <Card>
        <Header />
        <Body colsNumber={colsNumber} />
    </Card>
);

Resources.propTypes = {
    colsNumber: PropTypes.number,
};

Resources.defaultProps = {
    colsNumber: undefined,
};

export default memo(Resources);
