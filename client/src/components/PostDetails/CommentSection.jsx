import React,{ useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import {commentPost} from '../../actions/posts';

const CommentSection = ( post ) => {
    // console.log(post);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.post?.comments);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        // Who wrote the comment and context of comment.
        const finalComment = `${user.result.name}: ${comment}`;
        // console.log(post._id);
        const newComments = await dispatch(commentPost(finalComment, post.post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer} >
                    <Typography gutterBottom variant="h6" >Comments</Typography>
                    {/* c -> comment, i -> index */}
                    {comments.map((c,i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>

                {/* {console.log(post.post._id)} */}

                {/* If user is logged in the show all the HTML elements of writing the comment. */}
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick} >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;