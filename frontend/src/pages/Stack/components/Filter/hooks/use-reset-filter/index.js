import { useEffect } from 'react';

import { dispatch } from 'store';

const useResetFilter = (action) => {
    useEffect(() => (
        () => {
            dispatch(action({ search: '' }));
        }
    ), []); // eslint-disable-line
};

export default useResetFilter;
