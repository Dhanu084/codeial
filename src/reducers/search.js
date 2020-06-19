import { FETCH_SEARCH_USERS_SUCCESS } from "../actions/index";

const initialSearchState = {
  results: [],
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_USERS_SUCCESS:
      return {
        ...state,
        results: action.users,
      };
    default:
      return state;
  }
}
