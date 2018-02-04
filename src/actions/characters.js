import fetch from 'superagent-bluebird-promise';

import {
  CHARACTERS_SET_CURRENT_PAGE,
  FETCH_CHARACTERS_LIST_START,
  FETCH_CHARACTERS_LIST_SUCCESS,
  FETCH_CHARACTERS_LIST_ERROR
} from '../constants/characters';

export const charactersSetCurrentPage = (currentPage) => ({
  type: CHARACTERS_SET_CURRENT_PAGE,
  payload:{
    currentPage
  }
});

export const fetchCharactersStart = (currentPage) => ({
  type: FETCH_CHARACTERS_LIST_START,
  payload:{
    currentPage
  }
});

export const fetchCharacters = (currentPage) => (
  fetch.get(currentPage)
    .promise()
);

export const fetchCharactersSuccess = (data, currentPage) => ({
  type: FETCH_CHARACTERS_LIST_SUCCESS,
  payload: {
    ...data,
    currentPage
  }
});

export const fetchCharactersError = (error, currentPage) => ({
  type: FETCH_CHARACTERS_LIST_ERROR,
  payload: {
    error,
    currentPage
  }
});
