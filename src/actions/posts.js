import { UPDATE_POSTS, CREATE_POSTS } from "./index";
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
