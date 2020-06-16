import { UPDATE_POSTS, CREATE_POSTS } from "../actions/index";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case CREATE_POSTS:
      return [action.post, ...state];
    default:
      return state;
  }
}
