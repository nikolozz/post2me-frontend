import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATIONS_VIEWED,
} from '../types';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`${apiUrl}/authenticate`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${apiUrl}/login`, userData)
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
    .post(`${apiUrl}/register`, userData)
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
    .post(`${apiUrl}/users/add-avatar`, formData)
    .then(() => dispatch(getUserData()))
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .patch(`${apiUrl}/users`, userDetails)
    .then(() => dispatch(getUserData()))
    .catch(console.log);
};

export const markNotificationsRead = () => (dispatch) => {
  axios
    .get(`${apiUrl}/notifications/mark`)
    .then(() => dispatch({ type: MARK_NOTIFICATIONS_VIEWED }));
};
