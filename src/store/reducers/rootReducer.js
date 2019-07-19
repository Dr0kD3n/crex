import { combineReducers } from 'redux';
import currenciesReducer from './currenciesReducer';
import historyReducer from './historyReducer';

export default combineReducers({
    currenciesReducer,
    historyReducer
});
