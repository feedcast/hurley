import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { routerReducer  } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers'
import feedcast from './sagas';

const reducer = combineReducers({ ...reducers, routing: routerReducer });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(feedcast);

export default store;
