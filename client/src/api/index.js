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

// To get all posts data in form of array.
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id,updatedPost) => API.patch(`/posts/${id}/likePost`);

// This is for singin and signup.
export const signIn = (formData) => API.post('/users/signin',formData);
export const signUp = (formData) => API.post('/users/signup',formData);