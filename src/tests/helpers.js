import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


export const withStore = (children, state={}) => {
  const middlewares = [],
        mockStore = configureStore(middlewares),
        store = mockStore(state);

  return (
    <Provider store={ store }>
    { children }
    </Provider>
  );
}
