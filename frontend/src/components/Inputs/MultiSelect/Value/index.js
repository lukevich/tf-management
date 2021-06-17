import React from 'react';
import PropTypes from 'prop-types';

const Value = ({ selected }) => {
    if (!selected.length) return 'All Regions';

    return (
        selected.map(({ label, value }, index) => (
            <span key={value}>
                {index !== 0 && ', '}
                {label}
            </span>
        ))
    );
};

Value.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })),
};

export default Value;
