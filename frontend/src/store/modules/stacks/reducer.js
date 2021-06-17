import { handleActions } from 'redux-actions';
import { setStacksAction, stacksFilterAction } from './actions';

const initialData = {
    data: [],
    state: {
        pending: false,
        silentPending: false,
        data: [],
        filter: {
            search: '',
            regions: [],
        },
    },
};

export default handleActions({
    [setStacksAction]: (state, { payload }) => {
        const { data, ...rest } = payload;

        return {
            ...state,
            data: data || state.data,
            state: {
                ...state.state,
                ...rest,
                data: filterData(data || state.data, state.state.filter),
            },
        };
    },
    [stacksFilterAction]: (state, { payload = {} }) => {
        const filter = { ...state.state.filter, ...payload };

        return {
            ...state,
            state: {
                ...state.state,
                filter,
                data: filterData(state.data, filter),
            },
        };
    },
}, initialData);

function filterData(data, filters) {
    const { regions, search } = filters;

    const lowerSearch = search.trim().toLowerCase();

    if (!regions.length && !lowerSearch) {
        return data;
    }

    const filteredByRegions = data.filter((d) => {
        const regionsNames = regions.map((region) => region.label);

        if (regions.length) {
            return regionsNames.includes(d.region);
        }

        return data;
    });

    if (lowerSearch) {
        return filteredByRegions.filter((stack) => stack.name.toLowerCase().includes(lowerSearch));
    }

    return filteredByRegions;
}
