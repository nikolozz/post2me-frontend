import { SET_USER, SET_UNAUTHENTICATED, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const getUserData = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API_URL}/login`, userData)
    .then((res) => {
      const bearerToken = `Bearer ${res.headers['authentication']}`;
      const { id } = jwtDecode(res.headers['authentication']);
      localStorage.setItem('authentication', bearerToken);
      axios.defaults.headers.common['Authorization'] = bearerToken;
      dispatch(getUserData(id));
      history.push('/');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API_URL}/register`, userData)
    .then(() => {
      history.push('/login');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('authentication');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
