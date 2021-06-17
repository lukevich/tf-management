import { useEffect } from 'react';

import { fetchStack, resetStack } from 'store/effects';

const useStack = (id, stacks) => {
    useEffect(() => {
        (async () => {
            await fetchStack(id, stacks);
        })();

        return () => resetStack();
    }, [id, stacks]);
};

export default useStack;
