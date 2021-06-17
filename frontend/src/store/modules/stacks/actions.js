import { createActions } from 'redux-actions';

export const {
    setStacksAction,
    stacksFilterAction,
} = createActions(
    'SET_STACKS_ACTION',
    'STACKS_FILTER_ACTION',
);
