import { LIKE_POST, UNLIKE_POST, SET_POSTS, DELETE_POST } from '../types';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const loadingPosts = () => (dispatch) => {
  return axios
    .get(`${apiUrl}/posts?limit=25&offset=0`)
    .then(({ data }) => {
      dispatch({ type: SET_POSTS, payload: data });
    })
    .catch(dispatch({ type: SET_POSTS, payload: [] }));
};

export const likePost = (postId) => (dispatch) => {
  return axios
    .post(`${apiUrl}/votes`, { postId })
    .then(({ data }) => {
      dispatch({ type: LIKE_POST, payload: data });
    })
    .catch(console.log);
};

export const unlikePost = (postId) => (dispatch) => {
  return axios
    .delete(`${apiUrl}/votes/${postId}`)
    .then(({ data }) => {
      dispatch({ type: UNLIKE_POST, payload: data });
    })
    .catch(console.log);
};

export const deletePost = (postId) => (dispatch) => {
  axios.delete(`${apiUrl}/posts/${postId}`).then(() => {
    dispatch({ type: DELETE_POST, payload: postId });
  });
};
