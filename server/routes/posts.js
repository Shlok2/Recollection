// Inside here will be routes of post/posts being with cors.

import express from 'express';

import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// Instead of (localhost:5000) -> (localhost:5000/posts) as we add prefix 
// post in index.js on line 19.

// getPosts is a element in file posts.js(inside controller folder) and have
// all the details like (req,res) => {
//     res.send('This Works!');
// } so that this posts.js looks clean when we have many requests.
router.get('/', getPosts);

// auth is from midddleware folder.Check out that file.
// auth -> only authentic user can create,update,like,delete the post.
router.post('/', auth, createPost);
// patch is used for updating existing documents.
router.patch('/:id', auth,updatePost)
// To delete a post.
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);

export default router;