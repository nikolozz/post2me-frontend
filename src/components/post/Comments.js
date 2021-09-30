import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import CommentForm from './CommentForm';

import { Grid, Typography, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.stylesObject,
  commentImage: { width: 50, height: 50, objectFit: 'cover' },
  commentData: { marginLeft: '20px' },
});

const Comments = ({ comments, postId, classes }) => {
  return (
    <Fragment>
      <Grid container>
        {comments.map((comment, idx) => {
          const {
            content,
            createdAt,
            author: { id, avatar, username },
          } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={avatar.url} alt="comment" className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography variant="h5" component={Link} to={`/users/${id}`} color="primary">
                        @{username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{content}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {idx !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
            </Fragment>
          );
        })}
        <CommentForm postId={postId} />
      </Grid>
    </Fragment>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
};

export default withStyles(styles)(Comments);
