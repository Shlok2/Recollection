import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth';

// in here we will mention all the reducers we have.
export default combineReducers({
    posts: posts,
    auth: auth
});
// export const reducers = combineReducers({ posts, auth });