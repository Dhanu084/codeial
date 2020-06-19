import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./Auth";
import editProfile from "./editProfile";
import profile from "./profile";
import friends from "./friends";
import search from "./search";

export default combineReducers({
  posts,
  auth,
  editProfile,
  profile,
  friends,
  search,
});
