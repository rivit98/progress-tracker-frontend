import { createLogger } from 'redux-logger/src';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { applyMiddleware, createStore } from 'redux';
import { appReducer } from './appReducer';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const configureStore = () => {
    const store = createStore(persistedReducer, applyMiddleware(createLogger()));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./appReducer', () => {
            const nextReducer = require('./appReducer').default;

            store.replaceReducer(nextReducer);
        });
    }

    return store;
};

const store = configureStore();
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
