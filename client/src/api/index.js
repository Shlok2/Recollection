// Api is connecting both server and client folders.

// All data is stored on server and when we want to take the filtered
// data (like only mobile brand names) then only that data is fetched.
// Api is called only once.
// axios is npm.
// If we have API link then we can get its data(json) using axios.
import axios from 'axios';

// This url returns all the posts in database.
const url = 'http://localhost:5000/posts';

// To get all posts data in form of array.
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id,updatedPost) => axios.patch(`${url}/${id}/likePost`);