import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();
// persistor.purge(); // TODO: do this somehow (add restart?)

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

