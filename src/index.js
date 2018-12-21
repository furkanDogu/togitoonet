import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';

import './index.css';
import reducers from '../src/reducers';
import rootSaga from './sagas/watcher';
import AppRouter from './routes/AppRouter';




const sagaMiddleware = createSagaMiddleware();

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
sagaMiddleware.run(rootSaga);
const  jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));
serviceWorker.unregister();
