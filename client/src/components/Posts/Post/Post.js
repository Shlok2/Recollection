import React,{ useState } from 'react';
import {Card,CardActions,CardMedia,Button,Typography, CardContent, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import {deletePost, likePost} from '../../../actions/posts';

// post passed as prop(from posts.js).
const Post = ({ post,setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes,setLikes] = useState(post?.likes);

    const handleLike = async () => {
        dispatch(likePost(post._id))
    }

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }

      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    // Go to loacation /posts/id
    const openPost = () => history.push(`/posts/${post._id}`);
    
    return (
        <Card className={classes.card} raised elevation={6} >
            <ButtonBase className={classes.cardAction} onClick={openPost}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    {/* moment.fromNow -> it tell how ago (eg-> 2 years ago) */}
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                    {/* MoreHorizIcon -> ... icon */}
                    {/* Here we finally used setCurrentId function imported from Posts.js and it
                    recieved it from app.js. */}
                {/* {console.log(post)} */}
                {(user?.result?.name === post?.name || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small"
                        >
                        <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                {/* gutterBottom adds margin to the bottom of component. */}
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes/>
                </Button>
                {/* If current loggedin google user is same as the person created the post || or the 
                person is a manual logged in user. -> Then only show delete post button.*/}
                {/* {(user?.result?.name === post?.name || user?.result?._id === post?.creator) && ( */}
                <Button size='small' color='primary'  onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
                {/* )} */}
            </CardActions>
        </Card>
    );
}
export default Post;