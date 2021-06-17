import { useEffect } from 'react';

import { dispatch } from 'store';
import { stacksFilterAction } from 'store/actions';

const useFilters = (filter) => {
    useEffect(() => {
        dispatch(stacksFilterAction(filter));
    }, []); // eslint-disable-line
};

export default useFilters;
