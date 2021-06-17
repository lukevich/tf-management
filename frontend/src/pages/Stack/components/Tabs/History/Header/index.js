import React from 'react';

import { CardHeader } from 'pages/Stack/components';

import Filter from '../Filter';
import Count from './Count';
import styles from './styles.scss';

const Header = () => (
    <CardHeader>
        <div className={styles.history__header}>
            <Filter />
            <Count />
        </div>
    </CardHeader>
);

export default Header;
