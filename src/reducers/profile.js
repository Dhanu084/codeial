import {
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  FETCH_USER,
} from "../actions";

const initialstate = {
  user: {},
  inProgress: false,
  success: false,
  error: null,
};

export default function profile(state = initialstate, action) {
  switch (action.type) {
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
      };
    case FETCH_USER:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return {
        ...state,
      };
  }
}
