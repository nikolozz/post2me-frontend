import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton as Button } from '@material-ui/core';

const IconButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName}>
    <Button onClick={onClick} className={btnClassName}>
      {children}
    </Button>
  </Tooltip>
);

IconButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  tip: PropTypes.string,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.string,
};

export default IconButton;
