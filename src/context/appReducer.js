import { combineReducers } from 'redux';
import userReducer from './userReducer';
import crackmesReducer from '../components/crackmes/redux/crackmesReducer';

export const appReducer = combineReducers({ userReducer, crackmesReducer });
