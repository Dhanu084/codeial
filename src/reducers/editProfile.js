import {
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  CLEAR_EDIT_STATE,
} from "../actions/index";
import { initialAuthState } from "./Auth";

export default function edit(state = initialAuthState, action) {
  switch (action.type) {
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        error: action.error,
      };
    }
    case EDIT_PROFILE_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case CLEAR_EDIT_STATE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return {
        ...state,
      };
  }
}
