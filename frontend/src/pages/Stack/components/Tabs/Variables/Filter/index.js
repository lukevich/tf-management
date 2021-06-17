import React from 'react';

import { stackVariablesFilterAction } from 'store/actions';
import { Filter as SearchFilter } from '../../..';

const Filter = () => (
    <SearchFilter placeholder="Filter by variable name" action={stackVariablesFilterAction} />
);

export default Filter;
