import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import App from './App';
import middlewares from './middleware/index';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers:  <R>(a: R) => R =
    typeof window === 'object' &&
        // tslint:disable-next-line:no-string-literal
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
        // tslint:disable-next-line:no-string-literal
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        // specify extension's options
  }) : compose;

const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  );

const store = createStore(reducer, enhancers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

