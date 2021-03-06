import {
  ADD_POST,
  DELETE_POST,
  LIKE_POST,
  SET_POSTS,
  UNLIKE_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  posts: [],
  post: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST: {
      const { votes } = action.payload;
      const index = state.posts.findIndex((post) => post.id === action.payload.postId);
      if (state.post.id === action.payload.postId) {
        const post = state.posts.find((post) => post.id === action.payload.postId);
        post.votes = [action.payload.votes];
        state.post = post;
      }
      state.posts[index]['votes'] = votes;
      return {
        ...state,
        post: { ...state.post },
      };
    }
    case DELETE_POST: {
      const index = state.posts.findIndex((post) => post.id === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case SET_POST:
      if (!action.payload) return;
      return {
        ...state,
        post: action.payload,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
      };
    default:
      return state;
  }
}
