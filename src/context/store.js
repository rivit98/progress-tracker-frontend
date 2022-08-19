import { logger } from 'redux-logger/src';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { __DEV__ } from '../utils/env';
import userReducer from './userReducer';
import crackmesReducer from '../components/crackmes/redux/crackmesReducer';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage
};

const appReducer = combineReducers({ userReducer, crackmesReducer });
const persistedReducer = persistReducer(persistConfig, appReducer);

const middlewares = []
if(__DEV__){
    middlewares.push(logger)
}

const store = configureStore({
        reducer: persistedReducer,
        devTools: __DEV__,
        middleware: middlewares
    }
);
const persistor = persistStore(store);

const withStore = (Wrapped) => (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Wrapped {...props} />
            </PersistGate>
        </Provider>
    );
};

export { store, persistor, withStore };
