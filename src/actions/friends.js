import {
  GET_FRIENDS_SUCCESS,
  CREATE_NEW_FRIEND,
  REMOVE_FRIENDSHIP,
} from "./index";
import { APIUrls } from "../helpers/urls";

export function getFriends(friends) {
  return {
    type: GET_FRIENDS_SUCCESS,
    friends,
  };
}
export function fetchFriends(userid) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userid);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(getFriends(data.data.friends));
        }
      });
  };
}

export function addNewFriend(friendship) {
  return {
    type: CREATE_NEW_FRIEND,
    friendship,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIENDSHIP,
    userId,
  };
}
