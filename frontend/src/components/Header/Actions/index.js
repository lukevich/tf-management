import React from 'react';
import PropTypes from 'prop-types';

import Refresh from '../Refresh';
import SilentPending from '../SilentPending';

import styles from './styles.scss';

const Actions = ({ onRefreshClick, ...props }) => (
    <div className={styles.actions}>
        <SilentPending {...props} />
        <Refresh onClick={onRefreshClick} {...props} />
    </div>
);

Actions.propTypes = {
    onRefreshClick: PropTypes.func.isRequired,
};

export default Actions;
