// reducer is a function that accepts state and action, and based on 
// action type we do particular action on state.
// state returns empty Array([]) if in function no other output of state is returned. 
// state is posts.
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes';

export default (posts = [],action) => {
    switch(action.type){
        // action.payload is actual post(data) we got from ACTION.
        case FETCH_ALL:
            return action.payload;

        // This action.payload contains information of new post -> hence
        // add this information to previous posts array.
        case CREATE:
            return [...posts,action.payload];

        // In this action.payload contains updated message id, if this id = post.id we want
        // to edit -> then update it or else remain it same.
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);

        // Keep all the post except where id == action.payload.
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);

        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);

        default:
            return posts;
    }
}