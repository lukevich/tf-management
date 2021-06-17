import React from 'react';
import PropTypes from 'prop-types';

import TR from './TR';
import TH from './TH';

const THead = ({ columns, ...props }) => (
    <thead>
        <TR {...props}>
            {columns.map((column) => (
                <TH key={column.key} column={column} />
            ))}
        </TR>
    </thead>
);

THead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
    })).isRequired,
};

export default THead;
