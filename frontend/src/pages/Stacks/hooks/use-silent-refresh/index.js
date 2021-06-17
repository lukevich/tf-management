import { useEffect, useState } from 'react';

import { fetchStacks } from 'store/effects';
import { silentRefreshTimout } from 'settings/app';

import { useStacks } from '..';

const useSilentRefresh = (data) => {
    const [stacks] = useStacks(data);
    const [stcks, setStacks] = useState(stacks);

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                const freshStacks = await fetchStacks(true);
                setStacks(freshStacks);
            })();
        }, silentRefreshTimout * 1000);
        return () => clearInterval(interval);
    }, []); // eslint-disable-line;

    return [stcks];
};

export default useSilentRefresh;
