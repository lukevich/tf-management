import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'clone-deep';
import Table from 'react-bootstrap/cjs/Table';

import { concatCls } from 'helpers/utils';

import THead from './THead';
import TBody from './TBody';

import styles from './styles.scss';

const TableComponent = (props) => {
    const { selectable, columns, data, onClickRow } = props;
    const { initSelections, onSelectChane, link, className } = props;

    const [selectionsValue, setSelectionsValue] = useState(initSelections);

    const onSelect = (value, selection) => {
        const cloneSelects = cloneDeep(selectionsValue);

        if (value) {
            cloneSelects.push(selection);
        } else {
            const selectionIndex = selectionsValue.findIndex((sel) => sel.id === selection.id);
            cloneSelects.splice(selectionIndex, 1);
        }
        setSelectionsValue(cloneSelects);

        onSelectChane(cloneSelects);
    };

    const onSelectAll = (value, sel) => {
        const cloneSelects = cloneDeep(sel);

        if (!value) {
            cloneSelects.length = 0;
        }

        setSelectionsValue(cloneSelects);
        onSelectChane(cloneSelects);
    };

    return (
        <div className={concatCls(styles.table__holder, className)}>
            <Table className={styles.table}>
                <THead
                    data={data}
                    columns={columns}
                    selectable={selectable}
                    selections={selectionsValue}
                    onSelectAll={(e, value) => onSelectAll(value, data)}
                />
                <TBody
                    data={data}
                    link={link}
                    columns={columns}
                    onSelect={onSelect}
                    selectable={selectable}
                    selections={selectionsValue}
                    onClickRow={onClickRow}
                />
            </Table>
        </div>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectable: PropTypes.bool,
    onClickRow: PropTypes.func,
    initSelections: PropTypes.arrayOf(PropTypes.object),
    onSelectChane: PropTypes.func,
    link: PropTypes.func,
    className: PropTypes.string,
};

TableComponent.defaultProps = {
    className: '',
    selectable: false,
    onClickRow: undefined,
    initSelections: [],
    onSelectChane: () => {},
    link: () => {},
};

export default TableComponent;
