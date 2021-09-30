import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../util/IconButton';

import { withStyles, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

const styles = {
  deleteButton: {
    top: '10%',
    left: '90%',
    position: 'absolute',
  },
};

const DeletePost = ({ classes, deletePost, postId }) => {
  const [open, setOpen] = useState(false);

  const handleDeletePost = () => {
    deletePost(postId);
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        tip="Delete Post"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <Delete color="secondary" />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete post?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeletePost()} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object,
  postId: PropTypes.number.isRequired,
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
