import { handleActions } from 'redux-actions';
import {
    setStackAction,
    stackResourcesFilterAction,
    stackVariablesFilterAction,
    stackOutputsFilterAction,
    stackHistoryFilterAction,
} from './actions';

const initialData = {
    data: null,
    state: {
        pending: null,
        silentPending: false,
        resources: {
            filter: { search: '' },
            data: [],
        },
        variables: {
            filter: { search: '' },
            data: {},
        },
        outputs: {
            filter: { search: '' },
            data: {},
        },
        history: {
            filter: { search: '' },
            data: [],
        },
    },
};

export default handleActions(
    {
        [setStackAction]: (state, { payload }) => {
            const { data, ...rest } = payload;

            return {
                ...state,
                data,
                state: {
                    ...state.state,
                    ...rest,
                    resources: {
                        ...state.state.resources,
                        data: data ? data.resources : null,
                    },
                    variables: {
                        ...state.state.variables,
                        data: data ? data.variables : null,
                    },
                    outputs: {
                        ...state.state.outputs,
                        data: data ? data.outputs : null,
                    },
                    history: {
                        ...state.state.history,
                        data: data ? data.history : null,
                    },
                },
            };
        },
        [stackResourcesFilterAction]: (state, { payload }) => {
            const filter = { ...state.state.resources.filter, ...payload };

            return {
                ...state,
                state: {
                    ...state.state,
                    resources: {
                        filter,
                        data: filterResourcesData((state.data || {}).resources, filter),
                    },
                },
            };
        },
        [stackVariablesFilterAction]: (state, { payload }) => {
            const filter = { ...state.state.variables.filter, ...payload };

            return {
                ...state,
                state: {
                    ...state.state,
                    variables: {
                        filter,
                        data: filterVariablesData((state.data || {}).variables, filter),
                    },
                },
            };
        },
        [stackOutputsFilterAction]: (state, { payload }) => {
            const filter = { ...state.state.outputs.filter, ...payload };

            return {
                ...state,
                state: {
                    ...state.state,
                    outputs: {
                        filter,
                        data: filterOutputsData((state.data || {}).outputs, filter),
                    },
                },
            };
        },
        [stackHistoryFilterAction]: (state, { payload }) => {
            const filter = { ...state.state.history.filter, ...payload };

            return {
                ...state,
                state: {
                    ...state.state,
                    history: {
                        filter,
                        data: filterHistoryData((state.data || {}).history, filter),
                    },
                },
            };
        },
    },
    initialData,
);

function filterResourcesData(data, filter) {
    const { search } = filter;

    if (!search) return data;

    const lowerSearch = search.toLowerCase().trim();

    return data.filter((d) => `${d.name}`.toLowerCase().includes(lowerSearch));
}

function filterHistoryData(data, filter) {
    const { search } = filter;

    if (!search) return data;

    const lowerSearch = search.toLowerCase().trim();

    return data.filter((d) => `${d.branch_name}`.toLowerCase().includes(lowerSearch));
}

function filterVariablesData(data, filter) {
    return filterObject(data, filter).byKey();
}

function filterOutputsData(data, filter) {
    return filterObject(data, filter).byKey();
}

function filterObject(data, filter) {
    const { search } = filter;

    const lowerSearch = search.toLowerCase().trim();

    const filterFn = (byKey = false) => {
        if (!search) return data;

        return Object.entries(data).reduce((acc, [key, value]) => {
            const val = byKey ? key : value;
            if (val.toLowerCase().includes(lowerSearch)) {
                return { ...acc, [key]: value };
            }

            return { ...acc };
        }, {});
    };

    return {
        byKey: () => filterFn(true),
        byValue: () => filterFn(false),
    };
}
