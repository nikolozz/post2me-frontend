import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../util/IconButton';
import { Link } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

const LikeButton = ({ likePost, unlikePost, user, postId }) => {
  const likedPost = () => {
    if (!user?.votes) {
      return;
    }
    return user.votes.find((like) => like.post.id === postId);
  };

  return !user.authenticated ? (
    <Link to="/login">
      <IconButton tip="like">
        <FavoriteBorderIcon></FavoriteBorderIcon>
      </IconButton>
    </Link>
  ) : likedPost(postId) ? (
    <IconButton onClick={() => unlikePost(postId)} tip="Unlike" color="primary">
      <FavoriteIcon></FavoriteIcon>
    </IconButton>
  ) : (
    <IconButton onClick={() => likePost(postId)} tip="Like" color="primary">
      <FavoriteBorderIcon></FavoriteBorderIcon>
    </IconButton>
  );
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likePost, unlikePost })(LikeButton);
