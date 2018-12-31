import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import configureStore from './configureStore';
import { startGameTimer } from './gameTimer';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();

if(window.location.pathname === '/new') {
    persistor.purge();
}

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root'));

startGameTimer(store.dispatch);

registerServiceWorker();

