import { ADD_POST, DELETE_POST, LIKE_POST, SET_POSTS, UNLIKE_POST } from '../types';

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
      state.posts[index]['votes'] = votes;
      return {
        ...state,
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
    default:
      return state;
  }
}
