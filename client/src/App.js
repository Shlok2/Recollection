import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

// Grow -> provides some animation.
// Grid -> Used to make responsive grid layout.
const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        // BrowserRouter -> keep your UI in sync with the URL.It is a parent component
        // to store all other component.
        <GoogleOAuthProvider clientId="54651485527-jnilbeqog1rmnvsfotdeosnb9pv5tcrh.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    {/* Either show the home or the Auth. */}
                    {/* Renders the first child <Route> that matches the location. */}
                    <Switch>
                        {/* If user type '/auth' in url -> send user to Auth page. */}
                        {/* If we try to visit '/' then it automatically redirect to '/posts'*/}
                        <Route path='/' exact component={() => <Redirect to="/posts" />} />
                        <Route path='/posts' exact component={Home} />
                        {/* Render home page when we want to search something. */}
                        <Route path='/posts/search' exact component={Home} />
                        <Route path='/posts/:id' component={PostDetails} />
                        {/* If I am signed In then redirect directly to /posts/, else
                        redirect to signIn page. */}
                        <Route path='/auth' exact component={() => (!user ? <Auth/> : <Redirect to="/posts/"/>)} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
// shlok