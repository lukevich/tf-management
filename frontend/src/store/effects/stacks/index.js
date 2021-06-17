import { setStacksAction } from 'store/actions';
import { apiServer } from 'settings/api-service';
import { dispatch } from '../../index';

export async function fetchStacks(silent = false) {
    if (!silent) {
        dispatch(setStacksAction({ pending: true }));
    } else {
        dispatch(setStacksAction({ silentPending: silent }));
    }

    const response = await apiServer.get('/environments');

    if (response) {
        const stackWithIds = (response.data.stacks || []).map((stack) => ({ ...stack, id: stack.name }));
        dispatch(setStacksAction({ pending: false, silentPending: false, data: stackWithIds }));

        return stackWithIds;
    }
    return [];
}
