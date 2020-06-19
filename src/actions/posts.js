import {
  UPDATE_POSTS,
  CREATE_POSTS,
  CREATE_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from "./index";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export default function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function createPost(post) {
  return {
    type: CREATE_POSTS,
    post,
  };
}

export function createNewPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ content }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(createPost(data.data.post));
        }
      });
  };
}

export function createComment(comment, post_id) {
  return {
    type: CREATE_COMMENT,
    comment,
    post_id,
  };
}

export function createNewComment(content, post_id) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ content, post_id }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(createComment(data.data.content, post_id));
        }
      });
  };
}

export function addNewlike(id, likeable_type, userId) {
  return (dispatch) => {
    const url = APIUrls.addLike(id, likeable_type);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (likeable_type === "Post") dispatch(addLiketoPost(id, userId));
          else addLiketoComment(id, userId);
        }
      });
  };
}

export function addLiketoPost(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
export function addLiketoComment(commentId, userId) {
  return {
    type: UPDATE_COMMENT_LIKE,
    commentId,
    userId,
  };
}
