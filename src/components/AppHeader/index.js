import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import style from './style.scss';

const Header = ({ classes }) => (
  <div className={ style.header }>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
            Star Wars - Drill
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
