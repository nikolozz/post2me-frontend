import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditDetails from '../components/EditDetails';
import IconButton from '../util/IconButton';
// MUI
import { withStyles, Button, Paper, Link as MuiLink, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const styles = (theme) => ({
  paper: {
    padding: 20,
    textAlign: 'center',
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

const Profile = ({
  uploadImage,
  logoutUser,
  classes,
  user: { id, username, avatar, authenticated, bio },
  loading,
}) => {
  const handleImageChange = (event) => {
    const [image] = event.target.files;
    const formData = new FormData();
    formData.append('file', image);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogount = () => {
    logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={avatar?.url || '/no-avatar.png'} alt="profile" className="profile-image" />
            <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden" />
            <IconButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary"></EditIcon>
            </IconButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${id}`} color="primary" variant="h5">
              @{username}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
          </div>
          <IconButton tip="Logout" onClick={handleLogount}>
            <KeyboardReturn color="primary"></KeyboardReturn>
          </IconButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Log In
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading...</p>
  );

  return profileMarkup;
};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapActionsToProps = { logoutUser, uploadImage };
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
