import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate } from 'helpers/utils';

import Info from '..';
import { CardBody } from '../../..';

const Body = ({ data, colsNumber }) => {
    if (!data) return null;

    const dataFields = [Info.PROP_NAME, Info.PROP_REGION, Info.PROP_LAST_UPDATED, Info.PROP_METADATA];

    const getData = () => Object.entries(data).reduce((acc, [key, value]) => {
        if (dataFields.includes(key)) {
            if (typeof value === 'object') {
                const { build_url: buildUrl, update_ts: updateTs, ...otherValues } = value;
                return { ...acc, ...otherValues, url: buildUrl, update_ts: formatDate(updateTs) };
            }

            return { ...acc, [key]: value };
        }

        return { ...acc };
    }, {});

    const calculateRowsNumber = () => {
        const fieldsLength = Object.keys(getData()).length - 2; // name and url not included;
        const colsNum = (fieldsLength / colsNumber);
        return fieldsLength > 2 ? colsNum : 1;
    };

    return (
        <CardBody
            withLink
            colsNumber={calculateRowsNumber()}
            data={getData()}
        />
    );
};

Body.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        outputs: PropTypes.shape({}),
    }),
    colsNumber: PropTypes.number,
};

Body.defaultProps = {
    data: null,
    colsNumber: undefined,
};

function mapStateToProps(state) {
    return {
        data: state.stack.data,
    };
}

export default connect(mapStateToProps)(Body);
