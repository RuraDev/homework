import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App';
import 'typeface-roboto';
import configure from './store';

import './style.scss';

injectTapEventPlugin();

const {
  store,
  history
} = configure();

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <HashRouter>
        <App history={ history }/>
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
