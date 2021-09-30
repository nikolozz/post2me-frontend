import {
  LIKE_POST,
  UNLIKE_POST,
  SET_POSTS,
  DELETE_POST,
  SET_ERRORS,
  ADD_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from '../types';
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

export const getPost = (postId) => (dispatch) => {
  return axios
    .get(`${apiUrl}/posts/${postId}`)
    .then(({ data }) => {
      dispatch({ type: SET_POST, payload: data });
    })
    .catch(dispatch({ type: SET_POST, payload: [] }));
};

export const createPost = (newPost) => (dispatch) => {
  return axios
    .post(`${apiUrl}/posts`, newPost)
    .then(({ data }) => {
      dispatch({ type: ADD_POST, payload: data });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
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

export const submitComment = (commentData) => async (dispatch) => {
  const { data } = await axios.post(`${apiUrl}/comments/create`, commentData);
  const comments = await axios.get(`${apiUrl}/comments/${data.post.id}`);
  dispatch({ type: SUBMIT_COMMENT, payload: comments.data });
};
