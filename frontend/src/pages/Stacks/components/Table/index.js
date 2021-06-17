import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate } from 'helpers/utils';
import { link } from 'settings/navigation/link';
import { Table as CommonTable } from 'components';

const Table = ({ state }) => {
    const getColumns = () => ([
        { key: Table.COL_NAME, title: 'Name', width: '55%' },
        { key: Table.COL_REGION, title: 'Region' },
        { key: Table.COL_UPDATE_TIME, title: 'Updated Time' },
    ]);

    const getRows = () => state.data.map((stack, index) => ({
        id: stack.id || `${stack.name}-${index}`,
        ...stack,
        update_ts: formatDate(stack.metadata.update_ts) || '-',
    }));

    return (
        <CommonTable
            columns={getColumns()}
            data={getRows()}
            link={link.toStack}
        />
    );
};

Table.COL_NAME = 'name';
Table.COL_REGION = 'region';
Table.COL_UPDATE_TIME = 'update_ts';

Table.propTypes = {
    state: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.object),
        selections: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        state: state.stacks.state,
    };
}

export default connect(mapStateToProps)(Table);
