import React from 'react';
import PropTypes from 'prop-types';

const TH = ({ column }) => (
    <th style={{ width: column.width }}>{column.title}</th>
);

TH.propTypes = {
    column: PropTypes.shape({
        title: PropTypes.string,
        width: PropTypes.string,
    }).isRequired,
};

export default TH;
