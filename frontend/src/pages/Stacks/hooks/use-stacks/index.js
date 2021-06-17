import { useEffect, useState } from 'react';
import { fetchStacks } from 'store/effects';

export default (data) => {
    const [stcks, setStacks] = useState(data);

    useEffect(() => {
        if (!data || !data.length) {
            (async () => {
                const stacks = await fetchStacks();
                setStacks(stacks);
            })();
        }
    }, []); // eslint-disable-line

    return [stcks];
};
