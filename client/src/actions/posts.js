import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
import * as api from '../api';

// Action creator are functions that returns actions.
// async (dispatch) is by redux-thunk.
// getPosts function will be used in app.js
export const getPosts = () => async (dispatch) => {

    // {data} is an object inside api.
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error);
    }
    // Format of actions.
    // const action = {type: 'FETCH_ALL' , payload: []}

    // dispatch(action);
}

export const createPost = (post) => async (dispatch) => {
    // This is making a post api request to backend server.
    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE , payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    // It returns updated post.
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {

        const {data} = await api.likePost(id);
        dispatch({type: LIKE, payload: data});

    } catch (error) {
        console.log(error);
    }
}