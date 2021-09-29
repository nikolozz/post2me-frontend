import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
} from '../types';
import axios from 'axios';

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`${process.env.REACT_APP_API_URL}/authenticate`)
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
      localStorage.setItem('authentication', bearerToken);
      axios.defaults.headers.common['Authorization'] = bearerToken;
      dispatch(getUserData());
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

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${process.env.REACT_APP_API_URL}/users/add-avatar`, formData)
    .then(() => dispatch(getUserData()))
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .patch(`${process.env.REACT_APP_API_URL}/users`, userDetails)
    .then(() => dispatch(getUserData()))
    .catch(console.log);
};
