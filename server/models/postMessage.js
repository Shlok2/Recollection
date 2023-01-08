// This file will have Mongoose Schema's and Models.

import mongoose from 'mongoose';

// Mongoose Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

// Mongoose Model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;