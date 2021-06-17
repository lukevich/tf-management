import React from 'react';

import { stackHistoryFilterAction } from 'store/actions';
import { Filter as SearchFilter } from '../../..';

const Filter = () => (
    <SearchFilter placeholder="Filter by branch name" action={stackHistoryFilterAction} />
);

export default Filter;
