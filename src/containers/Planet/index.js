import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';

import { compose, lifecycle, withProps, branch, renderNothing } from 'recompose';

import { withLoading } from 'recomposers';
import { _fetchPlanet } from 'thunk/planets';

const Planet = ({ content }) => (
  <span>{ content }</span>
);

Planet.propTypes = {
  content: PropTypes.string
};

const _Planet = compose(
  lifecycle({
    componentWillMount() {
      if (this.props.planetData) {
        return;
      }

      this.props.fetchPlanet(this.props.planetURL);
    }
  }),

  withProps(({ planetData }) => ({
    loading: isEmpty(planetData)
  })),

  withLoading,

  branch(
    ({ planetData }) => !planetData,
    renderNothing
  ),

  withProps(({ planetData }) => ({
    content: planetData.name
  }))
)(Planet);

function mapStateToProps({ planets }, { planetURL }) {
  return {
    planetData: planets.raw_items[planetURL]
  };
}

export default connect(
  mapStateToProps, {
    fetchPlanet: _fetchPlanet
  }
)(_Planet);
