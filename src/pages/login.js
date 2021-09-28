import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.UI.errors) {
      return {
        errors: nextProps.UI.errors,
      };
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const userDate = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(userDate, this.props.history);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors, username, password } = this.state;
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
                type="text"
                label="Username"
                className={classes.textField}
                value={username}
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
