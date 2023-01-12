// Api is connecting both server and client folders.

// All data is stored on server and when we want to take the filtered
// data (like only mobile brand names) then only that data is fetched.
// Api is called only once.
// axios is npm.
// If we have API link then we can get its data(json) using axios.
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

// This url returns all the posts in database.
// const url = 'http://localhost:5000/posts';

// This function will happen on each of our request.
// This is important for our middleware in server folder.
// We need to send our token back to backend so that it can verify
// that user is logged in or not.
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// To get all posts data in form of array.
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id,updatedPost) => API.patch(`/posts/${id}/likePost`);
// pass the value with it.
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, { value }) ;

// This is for singin and signup.
export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);