import { GET_FRIENDS_SUCCESS } from "./index";
import { APIUrls } from "../helpers/urls";

export function getFriends(friends) {
  return {
    type: GET_FRIENDS_SUCCESS,
    friends,
  };
}
export default function fetchFriends(userid) {
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
        console.log(data);
        if (data.success) {
          dispatch(getFriends(data.friendships));
        }
      });
  };
}
