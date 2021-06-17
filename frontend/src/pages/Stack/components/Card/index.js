import React from 'react';
import PropTypes from 'prop-types';

import BootstrapCard from 'react-bootstrap/cjs/Card';

import styles from './styles.scss';

const Card = ({ children }) => (
    <BootstrapCard className={styles.card}>
        {children}
    </BootstrapCard>
);

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;
