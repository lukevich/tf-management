import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useScreen } from 'hooks';
import { Card, CardBody } from 'pages/Stack/components';
import ListGroup from 'react-bootstrap/cjs/ListGroup';
import { formatDate } from '../../../../../../helpers/utils';

const Body = ({ stackHistory, colsNumber }) => {
    const { screen } = useScreen();

    if (!stackHistory) return null;

    const calculateRowsNumber = (data) => {
        const fieldsLength = Object.keys(data).length - 2; // name and url not included
        const colsNum = (fieldsLength / colsNumber);

        if (screen.width <= 768) {
            return fieldsLength;
        }

        return fieldsLength > 2 ? colsNum : 1;
    };

    const convertData = (data) => Object.entries(data).reduce((acc, [key, value]) => {
        if (key === 'update_ts') {
            return { ...acc, name: formatDate(value) };
        }

        if (key === 'build_url') {
            return { ...acc, url: value };
        }

        return { ...acc, [key]: value };
    }, {});

    return (
        <Card>
            {stackHistory.map((historyItem) => (
                <ListGroup key={historyItem.build_url}>
                    <CardBody
                        withLink
                        data={convertData(historyItem)}
                        colsNumber={calculateRowsNumber(historyItem)}
                    />
                </ListGroup>
            ))}
        </Card>
    );
};

Body.propTypes = {
    stackHistory: PropTypes.arrayOf(PropTypes.shape({})),
    colsNumber: PropTypes.number.isRequired,
};

Body.defaultProps = {
    stackHistory: undefined,
};

function mapStateToProps(state) {
    return {
        stackHistory: state.stack.state.history.data,
    };
}

export default connect(mapStateToProps)(Body);
