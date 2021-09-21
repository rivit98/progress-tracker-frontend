import { combineReducers } from 'redux';
import userReducer from './userReducer';

export const appReducer = combineReducers({ userReducer });
