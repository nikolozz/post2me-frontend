import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core/';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

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

const Post = ({ classes, post: { author, content, createdAt } }) => {
  dayjs.extend(relativeTime);
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
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.any,
  post: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.image,
      }),
    }),
    content: PropTypes.string,
    createdAt: PropTypes.date,
  }),
};

export default withStyles(styles)(Post);
