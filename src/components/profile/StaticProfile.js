import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { withStyles, Link, Paper, Typography } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.stylesObject,
  paper: {
    padding: 20,
    textAlign: 'center',
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
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
  },
});

const StaticProfile = ({ classes, profile: { username, createdAt, avatar, bio } }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={avatar?.url || '/no-avatar.png'} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <Link color="primary" variant="h5">
            @{username}
          </Link>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <CalendarToday color="primary" />
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(StaticProfile);
