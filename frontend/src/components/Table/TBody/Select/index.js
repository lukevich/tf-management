import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'components';

import styles from '../../styles.scss';

const Select = ({ row, selections, onChange }) => {
    const checked = useMemo(() => selections.some((selection) => row.id === selection.id), [row, selections]);

    const onChangeHandler = (e, value) => {
        e.stopPropagation();
        onChange(e, value);
    };

    return (
        <td onClick={(e) => e.stopPropagation()} className={styles.select}>
            <Checkbox
                className={styles.checkbox}
                checked={checked}
                onChange={onChangeHandler}
            />
        </td>
    );
};

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    row: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
