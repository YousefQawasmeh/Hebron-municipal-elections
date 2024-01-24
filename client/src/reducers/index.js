import { combineReducers } from 'redux';
// import {reducer as formReducer} from 'redux-form';
import personsReducer from './persons';
export default combineReducers({
    persons: personsReducer
});