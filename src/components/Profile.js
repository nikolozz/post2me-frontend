import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI
import { withStyles, Button, Paper, Link as MuiLink, Typography } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  paper: {
    padding: 20,
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

const Profile = ({ classes, user: { id, username, avatar, authenticated }, loading }) => {
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={avatar?.url} alt="profile" className="profile-image"></img>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${id}`} color="primary" variant="h5">
              @{username}
            </MuiLink>
          </div>
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
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withStyles(styles)(Profile));
