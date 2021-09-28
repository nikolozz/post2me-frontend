import { LOADING_POSTS, SET_POSTS } from '../types';

const initialState = {
  posts: [],
  loadingPostsData: true,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        loadingPostsData: false,
        loading: false,
        posts: action.payload,
      };
    case LOADING_POSTS:
      return {
        ...state,
        loadingPostsData: true,
        loading: true,
      };
    default:
      return state;
  }
}
