import React from 'react';

import { stackResourcesFilterAction } from 'store/actions';
import { Filter as SearchFilter } from '../../..';

const Filter = () => (
    <SearchFilter placeholder="Filter by resource name" action={stackResourcesFilterAction} />
);

export default Filter;
