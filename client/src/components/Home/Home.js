import React,{useState,useEffect} from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import {getPosts,getPostsBySearch} from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/pagination';
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles.js';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    // It stores id of a post.
    const [currentId,setCurrentId] = useState(null);
    // This is css file.
    // const classes = useStyles();

    // dispatch is used to use functions of 'actions'.
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const classes = useStyles();

    // Check the url and if url have page parameter then page = that page parameter
    // or else we will me on page 1.
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    const searchPost = () => {
        // search.trim -> removes empty spaces in between.
        if(search.trim() || tags){
            // dispatch -> fetch search post.
            // tags.join(',') -> joins an array and make it a complete String with ',' in between.
            dispatch(getPostsBySearch({search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else { 
            // else go to home page.
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        // 13 is enter key.
        if(e.keyCode === 13){
            // search post
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return(
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position = "static" color = "inherit">
                        <TextField name='search' variant='outlined' label='Search Memories' onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                        {/* To create a pill like design when searching for tags. */}
                        <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant='outlined' />
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    {!searchQuery && !tags.length && (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
    );
};

export default Home;