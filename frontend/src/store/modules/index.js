import { combineReducers } from 'redux';

import stacks from './stacks/reducer';
import stack from './stack/reducer';

export default combineReducers({
    stacks,
    stack,
});
