import fetch from 'superagent-bluebird-promise';

import {
  PLANETS_SET_CURRENT_PAGE,
  FETCH_PLANETS_LIST_START,
  FETCH_PLANETS_LIST_SUCCESS,
  FETCH_PLANETS_LIST_ERROR,
  FETCH_PLANET_START,
  FETCH_PLANET_SUCCESS,
  FETCH_PLANET_ERROR
} from '../constants/planets';

export const planetsSetCurrentPage = (currentPage) => ({
  type: PLANETS_SET_CURRENT_PAGE,
  payload:{
    currentPage
  }
});

// ============= FETCH PLANETS LIST FUNCTIONALITY ============= //

export const fetchPlanetsStart = (currentPage) => ({
  type: FETCH_PLANETS_LIST_START,
  payload:{
    currentPage
  }
});

export const fetchPlanets = (currentPage) => (
  fetch.get(currentPage)
    .promise()
);

export const fetchPlanetsSuccess = (data, currentPage) => ({
  type: FETCH_PLANETS_LIST_SUCCESS,
  payload: {
    ...data,
    currentPage
  }
});

export const fetchPlanetsError = (error, currentPage) => ({
  type: FETCH_PLANETS_LIST_ERROR,
  payload: {
    error,
    currentPage
  }
});

// ============= FETCH PLANET FUNCTIONALITY ============= //

export const fetchPlanetStart = (url) => ({
  type: FETCH_PLANET_START,
  payload:{
    url
  }
});

export const fetchPlanet = (url) => (
  fetch.get(url)
    .promise()
);

export const fetchPlanetSuccess = (data, url) => ({
  type: FETCH_PLANET_SUCCESS,
  payload: {
    ...data,
    url
  }
});

export const fetchPlanetError = (error, url) => ({
  type: FETCH_PLANET_ERROR,
  payload: {
    error,
    url
  }
});