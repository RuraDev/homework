import { cond, equals, path } from 'ramda';

import {
  API_STATUS_ERROR,
  API_STATUS_SUCCESS,
} from 'constants/api';

import {
  charactersSetCurrentPage,
  fetchCharactersStart,
  fetchCharacters,
  fetchCharactersSuccess,
  fetchCharactersError,
} from 'actions/characters';

export const _fetchCharacters = (currentPage) => {
  return (dispatch, getState) => {
    const { characters } = getState();

    if(path(['pages', currentPage], characters)) {
      return dispatch(charactersSetCurrentPage(currentPage));
    }

    dispatch(fetchCharactersStart(currentPage));
    return fetchCharacters(currentPage).then((response) => {

      const { body, status } = response;

      return cond([
        [equals(API_STATUS_ERROR),   () => (dispatch(fetchCharactersError(body, currentPage)))],
        [equals(API_STATUS_SUCCESS), () => (dispatch(fetchCharactersSuccess(body, currentPage)))]
      ])(status);

    }, (error) => {
      const { body } = error;

      return dispatch(fetchCharactersError(body, currentPage));
    });
  };
};
