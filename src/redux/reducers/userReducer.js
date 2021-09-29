import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  votes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return { ...state, loading: true };
    case LIKE_POST:
      return {
        ...state,
        votes: [
          ...state.votes,
          {
            owner: { username: state.username },
            post: { id: action.payload.postId },
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        votes: state.votes.filter((like) => like.post.id !== action.payload.postId),
      };
    default:
      return state;
  }
}
