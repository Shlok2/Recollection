// Client Id - 54651485527-jnilbeqog1rmnvsfotdeosnb9pv5tcrh.apps.googleusercontent.com
// Client Secret - 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

import React,{useState} from 'react';
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {signin,signup} from '../../actions/auth'; 

const initialState= {firstName: '', lastName: '', email: '',password:'',confirmPassword: ''}

const Auth = () => {

    const classes = useStyles();
    const [showPassoword,setShowPassoword] = useState(false);
    // isSignup = false -> you have to sign up.
    const [isSignup,setIsSignup] = useState(false);
const initialState= {firstName: '', lastName: '', email: '',password:'',confirmPassword: ''}
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassoword((prevShowPassoword) => !prevShowPassoword);

    const handleSubmit = (e) => {
        // To prevent from refreshing.
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData,history));
        }
        else{
            dispatch(signin(formData,history));
        }
    };

    const handleChange = (e) => {
        // Only change the value on field we are on, eg we are on 
        // lastName -> e = lastName, then only lastName will be updating
        // and rest all remains same.
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        // Reset the show password when we switch mode from signup to signin
        // and vice versa.
        setShowPassoword(false);
    };

    const googleSuccess = async (res) => {
        // Res.credential has all details like profile pic, name, email,etc
        // but all of it is encrypted.
        // It is a JWT and hence to decode this JWT we use jwt_decode library.
        // sub is used as a unique identifier.
        // const decoded: { name: string, picture: string, sub: string } = jwt_decode(res.credential);
        // const {name,picture,sub} = decoded;

        // const user = {
        //     _id: sub,
        //     _type: 'user',
        //     userName: name,
        //     image: picture
        // }

        // await axios.post(`http://localhost:3000/api/auth`, user);
        // ?. does not throw error if obj does not exist it throws undefined
        const token = res?.credential;
        const result = jwt_decode(res?.credential);
        // console.log(Object.values(temp(9)));
        // console.log(temp.name);
        // console.log(temp);
        try {
            dispatch({type:'AUTH' , data: {result,token}});
            // Go to home page after dispatch.
            history.push('/');

        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful");
    };

    return (
        // Container centers content horizontally.
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    {/* Lock icon */}
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />        
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>                                   
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassoword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {/* If isSignup == true -> then show Input */}
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                    </Grid>

                    <Button type = "submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    {/* below is for previous version of oauth 1.0 */}
                    {/* render is how is it gonna look like */}
                    {/* <GoogleLogin
                        clientId='54651485527-jnilbeqog1rmnvsfotdeosnb9pv5tcrh.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color = "primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon = {<Icon />} variant="contained" >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}

                    <GoogleLogin
                        // render={(renderProps) => (
                        //     <Button className={classes.googleButton} color = "primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon = {<Icon />} variant="contained" >Google Sign In</Button>
                        // )}

                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        
                    />

                    <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;