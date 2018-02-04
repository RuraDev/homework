import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import style from './style.scss';

const PageTitle = ({ content }) => (
  <div>
    <div className={ style.bar }>
      <Typography type="title" className={ style.title }>
        { content }
      </Typography>
    </div>
    <Divider/>
  </div>
);

PageTitle.propTypes = {
  content: PropTypes.any
};

export default PageTitle;
