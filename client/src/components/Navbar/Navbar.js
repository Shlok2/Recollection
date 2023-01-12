import React,{useState,useEffect} from 'react'
import { AppBar,Avatar,Typography,Toolbar,Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';

import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/destination.png';
import memoriesTest from '../../images/memories-Text.png';

const Navbar = () => {

    const classes = useStyles();
    // localStorage.getItem will retreve the data of localStorage which is put into
    // in reducers>auth.js.
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // console.log(user);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        // take user to home route.
        history.push('/');
        // After logout -> user = null.
        setUser(null);
    }

    // When location changes from '/auth' to '/', useEffect activates and
    // reload the profile part in navbar.
    useEffect(() => {
        // if token exists.
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            // If token expiry time(* 1000 means in milisec) is lower than 
            // current time, that means token time is over and hence logout
            // current user. 
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>

                <img src={memoriesTest} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height= "40" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        {/* If user dont have any profile photo -> user.result.name.charAt(0) show first letter of user name as avatar */}
                        <Avatar className={classes.purple} alt={user.result.name.charAt(0)} src = {user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
  );
}

export default Navbar;