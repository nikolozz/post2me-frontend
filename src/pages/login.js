import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

import { withStyles, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({ ...theme.stylesObject });

const login = ({ loginUser, classes, UI: { loading, errors }, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };
    console.log(userData);
    loginUser(userData, history);
  };

  return (
    <div>
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="username"
              name="username"
              type="text"
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
            {errors?.message && (
              <Typography variant="body2" className={classes.customError}>
                Wrong Credentials
              </Typography>
            )}
            <Button type="submit" variant="contained" className={classes.button} disabled={loading}>
              Login
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            <br />
            <small>
              Dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.any,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
