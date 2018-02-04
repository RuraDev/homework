import { cond, equals, path } from 'ramda';

import {
  API_STATUS_ERROR,
  API_STATUS_SUCCESS,
} from 'constants/api';

import {
  planetsSetCurrentPage,
  fetchPlanetsStart,
  fetchPlanets,
  fetchPlanetsSuccess,
  fetchPlanetsError,

  fetchPlanetStart,
  fetchPlanet,
  fetchPlanetSuccess,
  fetchPlanetError,
} from 'actions/planets';

export const _fetchPlanets = (currentPage) => {
  return (dispatch, getState) => {
    const { planets } = getState();

    if(path(['pages', currentPage], planets)) {
      return dispatch(planetsSetCurrentPage(currentPage));
    }

    dispatch(fetchPlanetsStart(currentPage));
    return fetchPlanets(currentPage).then((response) => {

      const { body, status } = response;

      return cond([
        [equals(API_STATUS_ERROR),   () => (dispatch(fetchPlanetsError(body, currentPage)))],
        [equals(API_STATUS_SUCCESS), () => (dispatch(fetchPlanetsSuccess(body, currentPage)))]
      ])(status);

    }, (error) => {
      const { body } = error;

      return dispatch(fetchPlanetsError(body, currentPage));
    });
  };
};

export const _fetchPlanet = (url) => {
  return (dispatch, getState) => {
    const { planets } = getState();

    if(path(['raw_items', url], planets)) {
      return null;
    }

    dispatch(fetchPlanetStart(url));
    return fetchPlanet(url).then((response) => {

      const { body, status } = response;

      return cond([
        [equals(API_STATUS_ERROR),   () => (dispatch(fetchPlanetError(body, url)))],
        [equals(API_STATUS_SUCCESS), () => (dispatch(fetchPlanetSuccess(body, url)))]
      ])(status);

    }, (error) => {
      const { body } = error;

      return dispatch(fetchPlanetError(body, url));
    });
  };
};
