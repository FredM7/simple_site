import { combineReducers } from "redux";
import userSlice from "./slices/user";

export const reducers = combineReducers({
  //TODO add more as needed
  userState: userSlice,
});
