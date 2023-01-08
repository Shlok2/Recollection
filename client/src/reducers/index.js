import { combineReducers } from "redux";
import posts from './posts';

// in here we will mention all the reducers we have.
export default combineReducers({
    posts: posts,
});