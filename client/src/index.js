import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// thunk middleware gives ability to action-creater to return a function
// instead of an action object.
// thunk acts as a middleware function through which one can access their state
// access store, and dispatch new CardActions.

import App from './App';
import './index.css';
// import { CardActions } from '@material-ui/core';

// See index.js in reducers folder to check all reducers.
const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>
,document.getElementById('root'));