import { createStore, compose } from 'redux';

import rootReducer from './modules';

const devtool = process.env.NODE_ENV && window.__REDUX_DEVTOOLS_EXTENSION__;
const reduxDevTools = (devtool && devtool()) || compose;

const store = createStore(rootReducer, reduxDevTools);

export default store;
export const { dispatch, getState } = store;
