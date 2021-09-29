import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import IconButton from '../util/IconButton';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Post = ({
  classes,
  post: { id, author, content, createdAt, votes, comments },
  user,
  likePost,
  unlikePost,
}) => {
  dayjs.extend(relativeTime);

  const likedPost = () => {
    if (!user?.votes) {
      return;
    }
    return user.votes.find((like) => like.post.id === id);
  };

  const likeButton = !user.authenticated ? (
    <IconButton tip="like">
      <Link to="/login">
        <FavoriteBorderIcon></FavoriteBorderIcon>
      </Link>
    </IconButton>
  ) : likedPost(id) ? (
    <IconButton onClick={() => unlikePost(id)} tip="Unlike" color="primary">
      <FavoriteIcon></FavoriteIcon>
    </IconButton>
  ) : (
    <IconButton onClick={() => likePost(id)} tip="Like" color="primary">
      <FavoriteBorderIcon></FavoriteBorderIcon>
    </IconButton>
  );

  return (
    <Card className={classes.card}>
      {author?.avatar ? (
        <CardMedia image={author?.avatar?.url} title="Profile image" className={classes.image} />
      ) : (
        <div></div>
      )}
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${author.username}`}
          color="secondary"
        >
          {author.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {content}
        </Typography>
        {likeButton}
        <span>{votes?.length} Likes</span>
        <IconButton tip="Comments">
          <ChatIcon></ChatIcon>
        </IconButton>
        <span>{comments?.length} comments</span>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.any,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.image,
      }),
    }),
    content: PropTypes.string,
    createdAt: PropTypes.date,
    votes: PropTypes.object,
    comments: PropTypes.array,
  }),
  user: PropTypes.object,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { likePost, unlikePost })(withStyles(styles)(Post));
