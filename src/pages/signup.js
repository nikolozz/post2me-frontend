import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

import { withStyles, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({ ...theme.stylesObject });

const signup = ({ signupUser, classes, UI: { loading, errors }, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      username,
      password,
      confirmPassword,
    };
    signupUser(newUserData, history);
  };

  return (
    <div>
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            Sign up
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="username"
              name="username"
              type="email"
              label="Username"
              className={classes.textField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            {errors?.message && (
              <Typography variant="body2" className={classes.customError}>
                Wrong Credentials
              </Typography>
            )}
            <Button type="submit" variant="contained" className={classes.button} disabled={loading}>
              Sign Up
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            <br />
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.any,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
