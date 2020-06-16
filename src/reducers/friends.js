import {
  GET_FRIENDS_SUCCESS,
  CREATE_NEW_FRIEND,
  REMOVE_FRIENDSHIP,
} from "../actions/index";

const defaultState = [];

export default function friends(state = defaultState, action) {
  switch (action.type) {
    case GET_FRIENDS_SUCCESS:
      return [...action.friends];
    case CREATE_NEW_FRIEND:
      return state.concat(action.friendship);
    case REMOVE_FRIENDSHIP:
      //let index = state.friends.indexOf(action.userId);
      console.log(state.friends);
      let newArray = state.filter(
        (friend) => friend.to_user._id != action.userId
      );
      return newArray;
    default:
      return state;
  }
}
