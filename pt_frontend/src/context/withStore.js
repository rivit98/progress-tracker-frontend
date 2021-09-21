import React from 'react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const withStore = (Wrapped) => (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Wrapped {...props} />
            </PersistGate>
        </Provider>
    );
};

export default withStore;
