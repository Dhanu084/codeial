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
} from "../actions/index";

export const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  error: null,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        user: action.user,
        isLoggedIn: true,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    }
    case SIGNUP_START: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        inProgress: false,
        user: action.user,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: "",
        isLoggedIn: false,
      };
    }
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
}
