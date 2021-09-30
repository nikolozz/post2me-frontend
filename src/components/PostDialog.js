import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../util/IconButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

import {
  withStyles,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.stylesObject,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFir: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
});

const PostDialog = ({ postId, post, classes, getPost }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenPost = () => {
    setOpen(true);
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      getPost(postId);
      setLoading(false);
    }
  }, [post, loading]);

  const dialogMarkup = loading ? (
    <CircularProgress size="200" />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={post?.author?.avatar?.url} alt="Profile image" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography component={Link} color="primary" variant="h5" to={`/users/${post?.author?.id}`}>
          @{post?.author?.username}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(post?.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="h6" color="textPrimary">
          {post?.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {post?.content}
        </Typography>
        <LikeButton postId={post?.id} />
        <span>{post?.votes?.length} Likes</span>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <span>{post?.comments?.length} Comments</span>
      </Grid>
    </Grid>
  );

  return (
    <Fragment>
      <IconButton
        onClick={() => handleOpenPost()}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMoreIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <IconButton tip="Close" onClick={() => setOpen(false)} tipClassName={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
});

export default connect(mapStateToProps, { getPost })(withStyles(styles)(PostDialog));
