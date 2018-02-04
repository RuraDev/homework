import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

import { compose, lifecycle, withProps, branch, renderNothing } from 'recompose';

import { withLoading } from 'recomposers';
import { _fetchSpecies } from 'thunk/species';

const Species = ({ content }) => (
  <span>{ content }</span>
);

Species.propTypes = {
  content: PropTypes.string
};

const _Species = compose(
  lifecycle({
    componentWillMount() {
      if (this.props.speciesData) {
        return;
      }

      this.props.fetchSpecies(this.props.speciesURL);
    }
  }),

  withProps(({ speciesData, speciesURL }) => ({
    loading: isEmpty(speciesData)
  })),

  withLoading,

  branch(
    ({ speciesData }) => !speciesData,
    renderNothing
  ),

  withProps(({ speciesData }) => ({
    content: speciesData.name
  }))
)(Species);

function mapStateToProps({ species }, { speciesURL }) {
  return {
    speciesData: species.raw_items[speciesURL]
  };
}

export default connect(
  mapStateToProps, {
    fetchSpecies: _fetchSpecies
  }
)(_Species);
