import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

let store;

export function configureStore() {
  store = createStore(reducers, applyMiddleware(thunk, logger));
  return store;
}
