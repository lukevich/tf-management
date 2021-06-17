import React from 'react';
import PropTypes from 'prop-types';

import { FiRefreshCw } from 'react-icons/all';

import styles from './styles.scss';

const Refresh = ({ onClick }) => (
    <div onClick={onClick} className={styles.refresh__wrapper}>
        <FiRefreshCw className={styles.refresh} />
    </div>
);

Refresh.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Refresh;
