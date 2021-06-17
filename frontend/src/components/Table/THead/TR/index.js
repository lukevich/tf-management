import React from 'react';
import PropTypes from 'prop-types';

import SelectAll from '../SelectAll';

const TR = ({ selectable, children, onSelectAll, ...props }) => (
    <tr>
        {selectable && <SelectAll onChange={onSelectAll} {...props} />}
        {children}
    </tr>
);

TR.propTypes = {
    selectable: PropTypes.bool.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default TR;
