import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import IconButton from '../../util/IconButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core/';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
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
  post: { id, author, title, content, createdAt, votes, comments },
  user,
}) => {
  dayjs.extend(relativeTime);

  const likeButton = <LikeButton postId={id} />;

  const deleteButton =
    user.authenticated && user.id === author.id ? <DeletePost postId={id} /> : null;

  return (
    <Card className={classes.card}>
      {author?.avatar ? (
        <CardMedia image={author?.avatar?.url} title="Profile image" className={classes.image} />
      ) : (
        <div></div>
      )}
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${author.id}`} color="secondary">
          {author.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          {title}
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
        {deleteButton}
        <PostDialog postId={id} username={user.username} />
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.any,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.image,
      }),
    }),
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.date,
    votes: PropTypes.array,
    comments: PropTypes.array,
  }),
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
