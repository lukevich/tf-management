import React from 'react';

import { stackOutputsFilterAction } from 'store/actions';
import { Filter as SearchFilter } from '../../..';

const Filter = () => (
    <SearchFilter placeholder="Filter by output name" action={stackOutputsFilterAction} />
);

export default Filter;
