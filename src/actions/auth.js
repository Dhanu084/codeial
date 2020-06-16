import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEAR_AUTH_STATE,
} from "./index";

import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function login_start() {
  return {
    type: LOGIN_START,
  };
}

export function login_success(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login_failure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(login_start);
    const url = APIUrls.login();
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(login_success(data.data.user));
        } else {
          dispatch(login_failure(data.message));
        }
      });
  };
}

export function signup_start() {
  return {
    type: SIGNUP_START,
  };
}

export function signup_success(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signup_failure(error) {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
}

export function signup(email, password, confirm_password, name) {
  return (dispatch) => {
    dispatch(signup_start());
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({
        email,
        password,
        confirm_password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("SIGNUP", data);
        if (data.success) {
          dispatch(signup_success(data.data.user));
        } else {
          dispatch(signup_failure(data.message));
        }
      });
  };
}

export function authenticate_user(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
