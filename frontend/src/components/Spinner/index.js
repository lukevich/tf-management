import React from 'react';
import PropTyeps from 'prop-types';

import { concatCls } from 'helpers/utils';

import styles from './styles.scss';

const Spinner = ({ absolute, size }) => (
    <div className={concatCls(styles.loader__wrapper, absolute && styles.absolute)}>
        <div className={concatCls(styles.loader, styles[size])}>Loading...</div>
    </div>
);

Spinner.propTypes = {
    absolute: PropTyeps.bool,
    size: PropTyeps.string,
};

Spinner.defaultProps = {
    absolute: false,
    size: 'middle',
};

export default Spinner;
