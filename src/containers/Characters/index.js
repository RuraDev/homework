import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { compose, lifecycle, withProps, withHandlers, withState, branch, renderNothing } from 'recompose';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';

import { Link } from 'react-router-dom';

import { withLoading } from 'recomposers';
import { _fetchCharacters } from 'thunk/characters';
import PageTitle from 'components/PageTitle';
import CharacterDialog from 'containers/CharacterDialog';
import Planet from 'containers/Planet';

import {
  CHARACTERS_API_FIRST_PAGE
} from '../../constants/characters';

import style from './style.scss';

const Characters = ({ content,
                      nextDisabled,
                      prevDisabled,
                      fetchNextPage,
                      fetchPrevPage,
                      activeCharacterDetails,
                      onCloseCharacterDetails }) => (
  <div>
    <PageTitle content="Characters"/>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              <Link to="/planets">Home Planet</Link>
            </TableCell>
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

    <CharacterDialog
      onClose={ onCloseCharacterDetails }
      character={ activeCharacterDetails }
    />
  </div>
);

Characters.propTypes = {
  content       : PropTypes.array.isRequired,
  nextDisabled  : PropTypes.bool.isRequired,
  prevDisabled  : PropTypes.bool.isRequired,
  fetchNextPage : PropTypes.func.isRequired,
  fetchPrevPage : PropTypes.func.isRequired,
  activeCharacterDetails  : PropTypes.object,
  onCloseCharacterDetails : PropTypes.func.isRequired
};

const _Characters = compose(
  withState('activeCharacterDetails', 'setActiveCharacterDetails', null),

  lifecycle({
    componentWillMount() {
      this.props.fetchCharacters(CHARACTERS_API_FIRST_PAGE);
    }
  }),

  branch(
    ({ currentPage }) => !currentPage,
    renderNothing
  ),

  withHandlers({
    fetchNextPage: ({ fetchCharacters, currentPage }) => (page = currentPage.next) => fetchCharacters(page),
    fetchPrevPage: ({ fetchCharacters, currentPage }) => (page = currentPage.previous) => fetchCharacters(page),
    onOpenCharacterDetails  : ({ setActiveCharacterDetails }) => (character) => setActiveCharacterDetails(character),
    onCloseCharacterDetails : ({ setActiveCharacterDetails }) => () => setActiveCharacterDetails(null)
  }),

  withProps(({ currentPage, planets, onOpenCharacterDetails }) => ({
    loading     : currentPage.loading,
    nextDisabled: !currentPage.next,
    prevDisabled: !currentPage.previous,

    content: currentPage.results.map((item, index) => (
      <TableRow key={ index }>
        <TableCell onTouchTap={ () => onOpenCharacterDetails(item) }>
          { item.name }
        </TableCell>
        <TableCell>
          <Planet planetURL={ item.homeworld }/>
        </TableCell>
      </TableRow>
    ))
  })),

  withLoading
)(Characters);

function mapStateToProps({ characters, planets }) {
  return {
    currentPage : characters.pages[characters.currentPage],
    planets     : planets
  };
}

export default connect(
  mapStateToProps, {
    fetchCharacters: _fetchCharacters
  }
)(_Characters);
