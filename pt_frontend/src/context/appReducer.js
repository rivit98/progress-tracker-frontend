import { combineReducers } from 'redux';
import userReducer from './userReducer';
import crackmesReducer from './crackmesReducer';

export const appReducer = combineReducers({ userReducer, crackmesReducer });
