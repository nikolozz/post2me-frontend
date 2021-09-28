import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({ ...theme.stylesObject });

class signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      loading: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, newUserData)
      .then(() => {
        this.setState({ loading: true });
        this.props.history.push('/login');
      })
      .catch((err) => this.setState({ errors: err, loading: false }));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { errors, email, password, confirmPassword, loading } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h3" className={classes.pageTitle}>
              Sign up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                name="username"
                type="email"
                label="Username"
                className={classes.textField}
                value={email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.message && (
                <Typography variant="body2" className={classes.customError}>
                  Wrong Credentials
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
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
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.any,
};

export default withStyles(styles)(signup);
