import { UPDATE_POSTS, CREATE_POSTS, CREATE_COMMENT } from "../actions/index";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case CREATE_POSTS:
      return [action.post, ...state];
    case CREATE_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    default:
      return state;
  }
}
