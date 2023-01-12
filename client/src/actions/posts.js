import {FETCH_ALL,FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {

    // {data} is an object inside api.
    try {

        // This will start loading till all posts loaded.
        dispatch({ type: START_LOADING });

        const {data} = await api.fetchPost(id);
        // console.log(data);

        dispatch({type: FETCH_POST, payload: data});
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
};

// Action creator are functions that returns actions.
// async (dispatch) is by redux-thunk.
// getPosts function will be used in app.js
export const getPosts = (page) => async (dispatch) => {

    // {data} is an object inside api.
    try {

        // This will start loading till all posts loaded.
        dispatch({ type: START_LOADING });

        const {data} = await api.fetchPosts(page);
        console.log(data);

        dispatch({type: FETCH_ALL, payload: data});
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
    // Format of actions.
    // const action = {type: 'FETCH_ALL' , payload: []}

    // dispatch(action);
};



export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    // This is making a post api request to backend server.
    try {
        dispatch({ type: START_LOADING });

        const {data} = await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({type: CREATE , payload: data});

        dispatch({ type: END_LOADING });
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

export const commentPost = (value, id) => async(dispatch) => {
    try {
        // console.log("sdkjflkfjksdjfkdsjfksdfkdsjakf");
        const {data} = await api.comment(value,id);
        dispatch({ type:COMMENT, payload: data });
        return data.comments;

    } catch (error) {
        console.log(error);
    }
}