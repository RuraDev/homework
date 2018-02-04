import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

import { logger } from 'middleware';
import rootReducer from 'reducers';

export default function configure() {

  const history = createHashHistory();

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        logger
      )
    )
  );

  window._store = store;
  return { store, history };
}
