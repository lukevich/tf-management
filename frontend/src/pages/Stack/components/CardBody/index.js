import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import ListGroup from 'react-bootstrap/cjs/ListGroup';
import { splitObjToArrayBy } from 'helpers/converter';

import { concatCls } from 'helpers/utils';
import { LinkLabels } from 'pages/Stack/components';

import styles from './styles.scss';

const CardBody = ({ data, colsNumber, className, withLink }) => {
    const getData = useMemo(() => {
        const { name, url, ...rest } = data;

        return {
            url,
            name,
            rest: splitObjToArrayBy(colsNumber, rest),
        };
    }, [data, colsNumber]);

    return (
        <ListGroup className={concatCls(styles.group, className)}>
            <ListGroup.Item className={concatCls(styles.items, withLink && styles.hover)}>
                <Row>
                    <Col>
                        <h3 className={styles.title}>
                            {getData.name}
                            {withLink && getData.url && (
                                <LinkLabels url={getData.url} />
                            )}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    {getData.rest.map((item) => (
                        <Col key={JSON.stringify(item)}>
                            {item.map((obj) => Object.entries(obj)
                                .map(([key, value]) => (
                                    <Row key={key} className={styles.item__row}>
                                        <Col className={styles.key__value}>
                                            <span className={styles.key}>{`${key}:`}</span>
                                            <span className={styles.value}>{value}</span>
                                        </Col>
                                    </Row>
                                )))}
                        </Col>
                    ))}
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
};

CardBody.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
    }).isRequired,
    colsNumber: PropTypes.number,
    withLink: PropTypes.bool,
};

CardBody.defaultProps = {
    className: '',
    colsNumber: 2,
    withLink: false,
};

export default memo(CardBody);
