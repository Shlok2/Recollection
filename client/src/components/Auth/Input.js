// This file is to take input in Auth.js

import { TextField,Grid,InputAdornment,IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';

// name,half,etc are props.
// Icon we are showing on right side of input for show password.
// InputAdornment -> allow icon to put after input field. 
const Input = ({name,half,handleChange,label,autoFocus,type,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
        name= {name}
        onChange = {handleChange}
        variant = "outlined"
        required
        fullWidth
        label = {label}
        autoFocus = {autoFocus}
        type = {type}
        
        InputProps= {name === 'password' ? {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type === "password" ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        } : null}
        />
    </Grid>
  )
}

export default Input;