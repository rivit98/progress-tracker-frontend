import { createLogger } from 'redux-logger/src';
// import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { applyMiddleware, createStore } from 'redux';
import { appReducer } from './appReducer';

const persistConfig = {
    key: 'root',
    // storage: storageSession
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

export { store, persistor };
