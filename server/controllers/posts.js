// This posts file is to make posts.js in routes to be more easy to read.

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// Try -> for what to do and catch -> if there is any error.
// async function -> stop the excecution of function till 'await' gets the value
// it needed.
// res.status(200) -> request success.
// res.status(404) -> not found.
// res.status(201) -> req succeded and resource created(usually response after POST req).
// res.status(409) -> req conflict with current state of server.
export const getPosts = async (req,res) => {
    try{

        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);

    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res) => {
    
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// /posts/:id
export const updatePost = async(req,res) => {
    // Rename id to _id.
    const { id:_id } = req.params;
    const post = req.body;

    // If user tried to access id which is not present -> then show error 404.
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');

    // post contains -> {title,name,message,tags} but not id -> hence we 
    // add _id to post and then sent it.
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id } ,{new: true});

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

// In routes > posts.js -> We have used auth middleware and middleware has
// a special property that if we use middleware before funct like likePost
// Than we can directly use constants of middleware functions(middleware > auth.js).
// hence we can use req.userId over here.
export const likePost = async (req,res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated '});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post to like with that id');
    
    const post = await PostMessage.findById(id);

    // Index will be -1 if user has not liked the post.
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        // like a post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // Update the like_count + 1;
    const updatedPost = await PostMessage.findByIdAndUpdate(id , post , { new: true });

    res.json(updatedPost);
}

