import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'components';

import styles from '../../styles.scss';

const SelectAll = ({ data, selections, onChange }) => {
    const checked = !!data.length && (data.length === selections.length);

    return (
        <th className={styles.select}>
            <Checkbox
                className={styles.checkbox}
                onChange={onChange}
                checked={checked}
            />
        </th>
    );
};

SelectAll.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectAll;
