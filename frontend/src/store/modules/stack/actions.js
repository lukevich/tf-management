import { createActions } from 'redux-actions';

export const {
    setStackAction,
    stackResourcesFilterAction,
    stackVariablesFilterAction,
    stackOutputsFilterAction,
    stackHistoryFilterAction,
} = createActions(
    'SET_STACK_ACTION',
    'STACK_RESOURCES_FILTER_ACTION',
    'STACK_VARIABLES_FILTER_ACTION',
    'STACK_OUTPUTS_FILTER_ACTION',
    'STACK_HISTORY_FILTER_ACTION',
);
