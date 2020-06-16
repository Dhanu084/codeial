import {
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  CLEAR_EDIT_STATE,
} from "./index";
import { login_success } from "./auth";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function edit_success(user) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    user,
    error: false,
  };
}

export function edit_failure(error) {
  return {
    type: EDIT_PROFILE_FAILURE,
    error,
  };
}
export function clear_edit_state() {
  return {
    type: CLEAR_EDIT_STATE,
    error: null,
  };
}
export function edit(name, password, confirm_password, id) {
  return (dispatch) => {
    const url = APIUrls.edit();
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password,
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(localStorage.getItem("token"));
        console.log(data);
        if (data.success) {
          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
          }
          dispatch(edit_success(data.data.user));
          dispatch(clear_edit_state);
          dispatch(login_success(data.data.user));
        } else {
          dispatch(edit_failure(data.message));
        }
      });
  };
}
