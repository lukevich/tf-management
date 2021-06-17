import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/cjs/Card';

import styles from './styles.scss';

const CardHeader = ({ children }) => (
    <Card.Header className={styles.card__header}>
        {children}
    </Card.Header>
);

CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CardHeader;
