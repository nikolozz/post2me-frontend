import { LOADING_POSTS, SET_POSTS } from '../types';

export const loadingPosts = () => (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  return fetch(`${process.env.REACT_APP_API_URL}/posts?limit=25&offset=0`)
    .then((res) => res.json())
    .then((body) => {
      dispatch({ type: SET_POSTS, payload: body });
    });
};
