// This file will have Mongoose Schema's and Models.

import mongoose from 'mongoose';

// Mongoose Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        // Array of ids
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

// Mongoose Model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;