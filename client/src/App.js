import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

// Grow -> provides some animation.
// Grid -> Used to make responsive grid layout.
const App = () => (
    // BrowserRouter -> keep your UI in sync with the URL.It is a parent component
    // to store all other component.
    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            {/* Either show the home or the Auth. */}
            {/* Renders the first child <Route> that matches the location. */}
            <Switch>
                {/* If user type '/auth' in url -> send user to Auth page. */}
                <Route path='/' exact component={Home} />
                <Route path='/auth' exact component={Auth} />
            </Switch>
        </Container>
    </BrowserRouter>
);

export default App;