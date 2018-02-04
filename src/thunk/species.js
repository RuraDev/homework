import { cond, equals, path } from 'ramda';

import {
  API_STATUS_ERROR,
  API_STATUS_SUCCESS,
} from 'constants/api';

import {
  fetchSpeciesStart,
  fetchSpecies,
  fetchSpeciesSuccess,
  fetchSpeciesError,
} from 'actions/species';

export const _fetchSpecies = (url) => {
  return (dispatch, getState) => {
    const { planets } = getState();

    if(path(['raw_items', url], planets)) {
      return null;
    }

    dispatch(fetchSpeciesStart(url));
    return fetchSpecies(url).then((response) => {

      const { body, status } = response;

      return cond([
        [equals(API_STATUS_ERROR),   () => (dispatch(fetchSpeciesError(body, url)))],
        [equals(API_STATUS_SUCCESS), () => (dispatch(fetchSpeciesSuccess(body, url)))]
      ])(status);

    }, (error) => {
      const { body } = error;

      return dispatch(fetchSpeciesError(body, url));
    });
  };
};
