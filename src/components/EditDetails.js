import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../util/IconButton';
// MUI
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = (theme) => ({ ...theme.stylesObject });

const EditDetails = ({ editUserDetails, classes, user: { bio } }) => {
  const [updatedBio, setUpdatedBio] = useState(bio ? bio : '');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const userDetails = {
      bio: updatedBio,
    };
    editUserDetails(userDetails);
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton tip="Edit details" onClick={() => setOpen(true)} btnClassName={classes.buttons}>
        <EditIcon color="primary"></EditIcon>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={updatedBio}
              onChange={(e) => setUpdatedBio(e.target.value)}
            />
          </form>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} color="primary">
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
