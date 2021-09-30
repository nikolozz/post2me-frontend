import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../util/IconButton';

import {
  withStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.stylesObject,
  submitButton: { position: 'relative', margin: '10px 0' },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '85%',
    top: '2%',
  },
  addPostForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const AddPost = ({ UI: { errors }, createPost, classes }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createPost({ title, content }).then(() => setLoading(false));
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)} tip="Create Post">
        <AddIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <IconButton tip="Close" onClick={() => setOpen(false)} tipClassName={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>Create a post</DialogTitle>
        <DialogContent>
          <form className={classes.addPostForm}>
            <TextField
              name="title"
              type="text"
              label="Title"
              error={errors?.message ? true : false}
              className={`${classes.textField} ${classes.addPostField}`}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              name="content"
              type="text"
              label="Post"
              multiline
              rows="3"
              placeholder="What are you thinking about?"
              error={errors?.message ? true : false}
              className={classes.textField}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
              onClick={handleSubmit}
            >
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

AddPost.propTypes = {
  createPost: PropTypes.func.isRequired,
  UI: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { createPost })(withStyles(styles)(AddPost));
