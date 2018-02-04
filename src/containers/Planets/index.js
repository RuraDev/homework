import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { compose, lifecycle, withProps, withHandlers, branch, renderNothing } from 'recompose';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';

import { withLoading } from 'recomposers';
import { _fetchPlanets } from 'thunk/planets';
import PageTitle from 'components/PageTitle';

import {
  PLANETS_API_FIRST_PAGE
} from 'constants/planets';

import style from './style.scss';

const Planets = ({ content,
                   nextDisabled,
                   prevDisabled,
                   fetchNextPage,
                   fetchPrevPage }) => (
  <div>
    <PageTitle
      content="Planets"
    />
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Terrain</TableCell>
            <TableCell>Population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { content }
        </TableBody>
      </Table>
    </Paper>
    <div className={ style.actions }>
      <Button fab mini disabled={ prevDisabled } onTouchTap={ () => fetchPrevPage() } color="primary">
        <KeyboardArrowLeftIcon />
      </Button>
      <Button fab mini disabled={ nextDisabled } onTouchTap={ () => fetchNextPage() } color="primary" >
        <KeyboardArrowRightIcon />
      </Button>
    </div>
  </div>
);

Planets.propTypes = {
  content       : PropTypes.array.isRequired,
  nextDisabled  : PropTypes.bool.isRequired,
  prevDisabled  : PropTypes.bool.isRequired,
  fetchNextPage : PropTypes.func.isRequired,
  fetchPrevPage : PropTypes.func.isRequired
};

const _Planets = compose(
  lifecycle({
    componentWillMount() {
      this.props.fetchPlanets(PLANETS_API_FIRST_PAGE);
    }
  }),

  branch(
    ({ currentPage }) => !currentPage,
    renderNothing
  ),

  withHandlers({
    fetchNextPage: ({ fetchPlanets, currentPage }) => (page = currentPage.next) => fetchPlanets(page),
    fetchPrevPage: ({ fetchPlanets, currentPage }) => (page = currentPage.previous) => fetchPlanets(page)
  }),

  withProps(({ currentPage, planets, onOpenCharacterDetails }) => ({
    loading     : currentPage.loading,
    nextDisabled: !currentPage.next,
    prevDisabled: !currentPage.previous,

    content: currentPage.results.map((item, index) => (
      <TableRow key={ index }>
        <TableCell>{ item.name }</TableCell>
        <TableCell>{ item.terrain }</TableCell>
        <TableCell>{ item.population }</TableCell>
      </TableRow>
    ))
  })),

  withLoading
)(Planets);

function mapStateToProps({ planets }) {
  return {
    currentPage : planets.pages[planets.currentPage]
  };
}

export default connect(
  mapStateToProps, {
    fetchPlanets: _fetchPlanets
  }
)(_Planets);
