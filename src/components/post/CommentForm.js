import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles, Button, Grid, TextField } from '@material-ui/core';

import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({ ...theme.stylesObject });

const CommentForm = ({ classes, authenticated, submitComment, postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment({ postId, content });
    setContent('');
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          className={classes.textField}
        ></TextField>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.invisibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  authenticated: PropTypes.bool,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
