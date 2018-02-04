import { cond, equals, T, always, isNil } from 'ramda';

const defaults = {
  raw_items   : {},
  pages       : {},
  currentPage : null,
  error       : false,
  loading     : false
};

import {
  fetchItemError,
  fetchItemStart,
  fetchItemSuccess,
  fetchListError,
  fetchListStart,
  fetchListSuccess,
  setCurrentPage,
} from './entityReducerProcessors/';

export default (actions) => (
  (state = defaults, { type, payload }) => {

    return cond([
      [equals(actions.SET_CURRENT_PAGE),    () => setCurrentPage(state, payload)],
      [equals(actions.FETCH_LIST_START),    () => fetchListStart(state, payload)],
      [equals(actions.FETCH_LIST_SUCCESS),  () => fetchListSuccess(state, payload)],
      [equals(actions.FETCH_LIST_ERROR),    () => fetchListError(state, payload)],
      [equals(actions.FETCH_ITEM_START),    () => fetchItemStart(state, payload)],
      [equals(actions.FETCH_ITEM_SUCCESS),  () => fetchItemSuccess(state, payload)],
      [equals(actions.FETCH_ITEM_ERROR),    () => fetchItemError(state, payload)],
      [T, always(state)]
    ])(!isNil(type) && type);
  }
);
