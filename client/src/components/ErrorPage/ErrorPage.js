import React from 'react';
import useStyles from './styles';
// import {Card,CardActions,CardMedia,Button,Typography, CardContent, ButtonBase} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import errorImage from '../../images/404_error.jpg';

const ErrorPage = () => {

    const classes = useStyles();

  return (
    <div>
        <Paper className={classes.paper}>
        <img src={errorImage} alt="React Logo" />
        </Paper>
    </div>
  )
}

export default ErrorPage