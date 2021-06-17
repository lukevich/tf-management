import React from 'react';
import PropTypes from 'prop-types';

import { Copy } from 'components';
import { GoLinkExternal } from 'react-icons/all';

import styles from './styles.scss';

const LinkLabels = ({ url }) => (
    <span className={styles.actions}>
        <Copy className={styles.copy} copyText={url} />
        <a className={styles.link} href={url} target="_blank" rel="noreferrer">
            <GoLinkExternal />
        </a>
    </span>
);

LinkLabels.propTypes = {
    url: PropTypes.string.isRequired,
};

export default LinkLabels;
