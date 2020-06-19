import {
  UPDATE_POSTS,
  CREATE_POSTS,
  CREATE_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from "../actions/index";

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
    case UPDATE_POST_LIKE:
      const newLikedPosts = state.map((post) => {
        if (post._id == action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return newLikedPosts;
    case UPDATE_COMMENT_LIKE:
      const newLikedComments = state.posts.map((comment) => {
        if (comment._id == action.commentId) {
          return {
            ...comment,
            likes: [...comment.likes, action.userId],
          };
        }
        return comment;
      });
      return newLikedComments;
    default:
      return state;
  }
}
