import { FETCH_SEARCH_USERS_SUCCESS } from "./index";
import { APIUrls } from "../helpers/urls";

function searchedUsers(users) {
  return {
    type: FETCH_SEARCH_USERS_SUCCESS,
    users,
  };
}

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchedUsers(data.data.users));
        } else {
          dispatch(searchedUsers([]));
        }
      });
  };
}
