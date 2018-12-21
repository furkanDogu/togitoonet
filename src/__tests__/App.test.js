import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../routes/AppRouter';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { addNewUser, getRegisteredByDepartment, getRegisteredByUser } from '../actions/userActions';
import { ADD_NEW_USER, GET_REGISTERED_BY_DEPARTMENT, GET_REGISTERED_BY_USER } from '../actions/types';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';



it('renders and connects to redux store without crashing', () => {
  const div = document.createElement('div');
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(
  applyMiddleware(sagaMiddleware)
  ));
  ReactDOM.render(<Provider store={store}>
    <AppRouter />
</Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
}); 

describe('UserActions', () => {
  test('should set up addNewUser action and return the action type', () => {
    const action = addNewUser({ mockData: 123, mockData2: 'abc' });
    expect(action).toEqual({
      type: ADD_NEW_USER,
      payload: {
        mockData: 123,
        mockData2: 'abc'
      }
    });
  
  });
  
  test('should set up getRegisteredByDepartment action and return the action type', () => {
    const action = getRegisteredByDepartment(123);
    expect(action).toEqual({
      type: GET_REGISTERED_BY_DEPARTMENT,
      payload: 123
    });
  });
  
  test('should set up getRegisteredByUser action and return the action type', () => {
    const action = getRegisteredByUser(999);
    expect(action).toEqual({
      type: GET_REGISTERED_BY_USER,
      payload: 999
    });
  });
});

describe('ApplicationReducers', () => {
  test('should set up userReducer with with initial values correctly', () => {
    const state = userReducer(undefined, { type: '@@INIT' });
    const initial_values = {
      email: '',
      token: '',
      name: '',
      userID: '',
      role: '',
      departmanID: '',
      isLoginFailed: false,
      employees: [],
      employeesIncPassive: [],
      departments: [],
      candidates: [],
      users: [],
      registeredProductsByUser: [],
      registeredProductsByDepartment: [],
      isFailModalOpen: false,
      isSuccessModalOpen: false,
  };
    expect(state).toEqual(initial_values);
  });
  
  test('should set up productReducer with initial values correctly', () => {
      const state = productReducer(undefined, { type: '@@INIT' });
      const initial_values = {
        unregisteredProducts: [],
        registeredProducts: [],
        brokenProducts: [],
        unregisteredPcComponents: [],
        registeredPcComponents: [],
        brands: [],
        categories: [],
        suppliers: [],
        cities: [],
        towns: []
    };
    expect(state).toEqual(initial_values);

  });
  
});

/* test('should set up productReducer with initial values', () => {

}); */

