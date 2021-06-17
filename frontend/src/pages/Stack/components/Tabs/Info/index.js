import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Header from './Header';
import Body from './Body';

const Info = ({ colsNumber }) => (
    <Card>
        <Header />
        <Body colsNumber={colsNumber} />
    </Card>
);

Info.PROP_NAME = 'name';
Info.PROP_REGION = 'region';
Info.PROP_LAST_UPDATED = 'update_ts';
Info.PROP_METADATA = 'metadata';

Info.propTypes = {
    colsNumber: PropTypes.number,
};

Info.defaultProps = {
    colsNumber: undefined,
};

export default Info;
