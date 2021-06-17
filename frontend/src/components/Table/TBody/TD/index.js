import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../../styles.scss';

const TD = ({ width, value, ...props }) => (
    <td style={{ width }} className={styles.cell}>
        <WrapLink {...props}>{value}</WrapLink>
    </td>
);

TD.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    width: PropTypes.string,
};

TD.defaultProps = {
    width: undefined,
};

const WrapLink = ({ children, onClickRow, link, row }) => {
    if (onClickRow) {
        return <div className={styles.link}>{children}</div>;
    }

    return <Link className={styles.link} to={link(row.id)}>{children}</Link>;
};

WrapLink.propTypes = {
    link: PropTypes.func.isRequired,
    row: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    children: PropTypes.node.isRequired,
    onClickRow: PropTypes.func,
};

WrapLink.defaultProps = {
    onClickRow: undefined,
};

export default TD;
