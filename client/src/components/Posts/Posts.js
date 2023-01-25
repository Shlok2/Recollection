import React from 'react';
import Post from "./Post/Post"
import {Grid,CircularProgress} from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from "./styles";

// setCurrentId as prop (from app.js).
const Posts = ({ setCurrentId }) => {
    const classes = useStyles();

    // in reducers>index.js -> we exported posts.
    const {posts, isLoading} = useSelector((state) => state.posts);
    // console.log(posts);

    if(!posts.length && !isLoading) return 'No Posts';
    
    return (
        // If there is no post -> Show loading Sign else show posts in grid format .
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        {/* Here the prop is used */}
                        <Post post={post} setCurrentId = {setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}
export default Posts;