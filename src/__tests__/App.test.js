import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../routes/AppRouter';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <AppRouter />
</Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

