// Client Id - 54651485527-jnilbeqog1rmnvsfotdeosnb9pv5tcrh.apps.googleusercontent.com
// Client Secret - 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

import React,{useState} from 'react';
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
const Auth = () => {

    const classes = useStyles();
    const [showPassoword,setShowPassoword] = useState(false);
    // isSignup = false -> you have to sign up.
    const [isSignup,setIsSignup] = useState(false);

    const handleShowPassword = () => setShowPassoword((prevShowPassoword) => !prevShowPassoword);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        // Reset the show password when we switch mode from signup to signin
        // and vice versa.
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log(res);
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
                                <Input name='firstName' label='First Name' handleChange={handleChange} half/>                                   
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

                    {/* render is how is it gonna look like */}
                    <GoogleLogin
                        clientId='54651485527-jnilbeqog1rmnvsfotdeosnb9pv5tcrh.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color = "primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon = {<Icon />} variant="contained" >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
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