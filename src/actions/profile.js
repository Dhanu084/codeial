import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_USER,
} from "./index";
import { APIUrls } from "../helpers/urls";

export function fetch_user() {
  return {
    type: FETCH_USER,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    types: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userid) {
  return (dispatch) => {
    dispatch(fetch_user());
    const url = APIUrls.userProfile(userid);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
        } else {
          dispatch(data.message);
        }
      });
  };
}
