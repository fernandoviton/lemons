import { applyMiddleware, compose, createStore } from 'redux'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import middlewares from './middleware/index';
import rootReducer from './reducers'

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

// const stateReconciler = (inboundState: any, outboundState: any, reducedState: any) => {
//   // tslint:disable-next-line:no-console
//   console.log(inboundState, outboundState, reducedState);
//   return inboundState || outboundState || reducedState;
// };

const persistConfig: PersistConfig = {
  debug: true,
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer, enhancers);
  const persistor = persistStore(store);
  return { store, persistor }
}