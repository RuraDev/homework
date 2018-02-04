import React from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { compose, withProps } from 'recompose';

import AppHeader from 'components/AppHeader';
import AppRoutes from 'containers/App/routes';

import style from './style.scss';

const App = ({ theme }) => (
  <MuiThemeProvider theme={ theme }>
    <div className={ style.wrapper }>
      <AppHeader />
      <div className={ style.content }>
        <AppRoutes />
      </div>
    </div>

  </MuiThemeProvider>

);

App.propTypes = {
  theme: PropTypes.object.isRequired
};

const _App = compose(
  withProps(() => ({
    theme: createMuiTheme({
      button: {
        fontWeight: 100,
      },
      typography: {
        title: {
          fontWeight: 100
        },
        button: {
          fontWeight: 100
        },
        subheading: {
          fontWeight: 200
        },
      }
    })
  }))

)(App);

export default _App;
