// To connect mongodb server -> go to mongodb atlas > database > cluster0 > connect > connect your application 
// npm start (in server) to start this file.

// saraogishlok50@gmail.com account is used to form cluster in mongodb atlas.
// userid -> shloksaraogi
// userPassword -> shloksaraogi123
// IPAddress -> 103.214.60.92/32

// __STEPS__ - to add new functionality in our website -> (Just follow steps) ->
// (2:07:10) (timestamp)
// In server folder->
// 1) routes > posts.js -> add a route.
// 2) controllers > posts.js -> create a function for route.
// In client folder->
// 1) api > index.js -> Do API call.
// 2) actions > posts.js -> make an action function.
// 3) reducers > posts.js -> make reducer for that action.
// 4) Now go to whichever file you want to use that function of 'actions'.
//    (eg -> post.js want to use function likePost from actions folder).
//    First import that function from actions and also import {useDispatch} from 'react-redux';
//    to use that function of 'actions'.

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// Also can use this to import.
// const express = require('express');

const app = express();
dotenv.config();

// Prefix /post is added to all routes in post.js

// To limit the size of upload by 30mb.
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL = "mongodb+srv://shloksaraogi:shloksaraogi123@cluster0.fbtloer.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// To remove the warning.
mongoose.set('strictQuery', true);

mongoose.connect(
  process.env.CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
