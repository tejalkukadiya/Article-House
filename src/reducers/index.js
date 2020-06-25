import { combineReducers } from "redux";
import  profileReducer  from "./profileReducer";
import articleReducer from './articleReducer';

export const rootReducer = combineReducers({
  profileData: profileReducer,
  articlesList : articleReducer,
});