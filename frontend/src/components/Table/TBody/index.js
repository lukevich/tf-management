import React from 'react';
import PropTypes from 'prop-types';

import TR from './TR';
import TD from './TD';

const TBody = (props) => {
    const { columns, data } = props;

    return (
        <tbody>
            {data.map((row) => (
                <TR key={row.id || row.name} row={row} {...props}>
                    {columns.map((col) => (
                        <TD
                            key={col.key}
                            width={col.width}
                            value={row[col.key]}
                            row={row}
                            {...props}
                        />
                    ))}
                </TR>
            ))}
        </tbody>
    );
};

TBody.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TBody;
