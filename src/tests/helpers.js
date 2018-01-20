import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

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

export const withContext = (children, state={}) => {
  return (
    <MemoryRouter>
      { withStore(children) }
    </MemoryRouter>
  );
}
