import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import authentication from './reducers/auth.reducer.jsx';

const rootReducer = combineReducers({
    authentication,
    forms
});

export default rootReducer;