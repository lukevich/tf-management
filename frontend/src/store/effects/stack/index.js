import { setStackAction } from 'store/actions';
import { dispatch } from 'store';

export async function fetchStack(id, stacks) {
    dispatch(setStackAction({ pending: true }));

    if (stacks && stacks.length) {
        const stack = stacks.find((stk) => stk.id === id);
        dispatch(setStackAction({ pending: false, data: stack }));
    }
}

export function resetStack() {
    dispatch(setStackAction({ data: null }));
}
