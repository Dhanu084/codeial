import { GET_FRIENDS_SUCCESS } from "../actions/index";

const defaultState = [];

export default function friends(state = defaultState, action) {
  switch (action.type) {
    case GET_FRIENDS_SUCCESS:
      return [action.friends];
    default:
      return state;
  }
}
