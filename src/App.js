import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import themeFile from './util/theme';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Material
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
// Components
import Navbar from './components/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';

const theme = createTheme(themeFile);

const token = localStorage.getItem('authentication');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // @TODO Implement refresh token
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
