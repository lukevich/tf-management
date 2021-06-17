import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '../../index';

import styles from './styles.scss';

const SilentPending = ({ silentPending }) => (
    <div className={styles.silent__pending}>
        {silentPending && <Spinner size="small" absolute />}
    </div>
);

SilentPending.propTypes = {
    silentPending: PropTypes.bool,
};

SilentPending.defaultProps = {
    silentPending: false,
};

export default SilentPending;
