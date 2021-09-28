import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({ ...theme.stylesObject });

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem('authentication', `Bearer ${res.headers['authentication']}`);
        this.setState({ loading: true });
        this.props.history.push('/');
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
    const { errors, email, password, loading } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h3" className={classes.pageTitle}>
              Login
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
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.any,
};

export default withStyles(styles)(login);
