import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';

import styles from '../../styles.scss';

const TR = ({ row, onClickRow, selectable, selections, onSelect, children }) => (
    <tr
        key={row.id || row.name}
        className={styles.row}
        onClick={(e) => onClickRow && onClickRow(e, row)}
    >
        {selectable && (
            <Select
                row={row}
                onChange={(e, value) => onSelect(value, row)}
                selections={selections}
            />
        )}
        {children}
    </tr>
);

TR.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
    }).isRequired,
    onClickRow: PropTypes.func,
    selectable: PropTypes.bool.isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

TR.defaultProps = {
    onClickRow: undefined,
};

export default TR;
