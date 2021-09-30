import React from 'react';
import PropTypes from 'prop-types';

const Comments = ({ comments }) => {
  console.log(comments);
  return <div></div>;
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
