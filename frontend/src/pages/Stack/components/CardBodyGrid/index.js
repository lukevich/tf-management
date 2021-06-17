import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import ListGroup from 'react-bootstrap/cjs/ListGroup';
import Card from 'react-bootstrap/cjs/Card';
import { splitObjToArrayBy } from 'helpers/converter';

import styles from './styles.scss';

const CardBodyGrid = ({ data, colsNumber, className }) => (
    <ListGroup className={className}>
        {splitObjToArrayBy(colsNumber, data).map((cols) => (
            <ListGroup.Item key={JSON.stringify(cols)} className={styles.items}>
                <Row>
                    {cols.map((obj) => (
                        <Col key={Object.keys(obj)[0]} md={12 / colsNumber}>
                            <Card.Title className={styles.title}>
                                {Object.keys(obj)[0]}
                            </Card.Title>
                        </Col>
                    ))}
                </Row>
                <Row>
                    {cols.map((obj) => (
                        <Col key={Object.keys(obj)[0]} md={12 / colsNumber}>
                            <Card.Text className={styles.value}>{`${Object.values(obj)[0]}`}</Card.Text>
                        </Col>
                    ))}
                </Row>
            </ListGroup.Item>
        ))}
    </ListGroup>
);

CardBodyGrid.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({}).isRequired,
    colsNumber: PropTypes.number,
};

CardBodyGrid.defaultProps = {
    className: '',
    colsNumber: 2,
};

export default memo(CardBodyGrid);
