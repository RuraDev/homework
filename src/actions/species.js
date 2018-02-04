import fetch from 'superagent-bluebird-promise';

import {
  FETCH_SPECIES_START,
  FETCH_SPECIES_SUCCESS,
  FETCH_SPECIES_ERROR
} from '../constants/species';

// ============= FETCH SPECIES FUNCTIONALITY ============= //

export const fetchSpeciesStart = (url) => ({
  type: FETCH_SPECIES_START,
  payload:{
    url
  }
});

export const fetchSpecies = (url) => (
  fetch.get(url)
    .promise()
);

export const fetchSpeciesSuccess = (data) => ({
  type: FETCH_SPECIES_SUCCESS,
  payload: {
    ...data
  }
});

export const fetchSpeciesError = (error) => ({
  type: FETCH_SPECIES_ERROR,
  payload: {
    error
  }
});