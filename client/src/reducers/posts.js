// reducer is a function that accepts state and action, and based on 
// action type we do particular action on state.
// state returns empty Array([]) if in function no other output of state is returned. 
// state is posts.
import {FETCH_ALL,FETCH_BY_SEARCH,FETCH_POST,CREATE,UPDATE,DELETE,LIKE,COMMENT,START_LOADING,END_LOADING} from '../constants/actionTypes';

export default (state = { isLoading:true, posts: [] },action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state,isLoading: true }
        
        case END_LOADING:
            return { ...state,isLoading: false }

        // action.payload is actual post(data) we got from ACTION.
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };

        // action.payload is data got from action.
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };

        case FETCH_POST:
            return {...state,post: action.payload};

        // This action.payload contains information of new post -> hence
        // add this information to previous posts array.
        case CREATE:
            return { ...state, posts: [...state.posts,action.payload]}

        // In this action.payload contains updated message id, if this id = post.id we want
        // to edit -> then update it or else remain it same.
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}

        // Keep all the post except where id == action.payload.
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)}

        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    // return all the other post normally...
                    // and change the post that just recieved a comment...
                    if(post._id === action.payload._id) {
                        return action.payload;
                    }
                    
                    return post;
                })
            };
        default:
            return state;
    }
}