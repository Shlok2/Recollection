
// What to do? -> Logic -> signIn and SignUp process.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req,res) => {
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"User doesn't exist!"});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials" });

        // If user exist in db and password is correct -> then make a encrypted token.
        // test is a secret key, usually stored in .env file.
        // Send JWT to frontend.
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1hr'});
        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({message: 'Something Went Wrong'});
    }
}

export const signup = async (req,res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body;

    try {
        // We cant make account if user already have an account.
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists!"});

        if(password !== confirmPassword) return res.status(404).json({message:"Password don't match!"});

        const hashedPassword = await bcrypt.hash(password, 12);

        // Create User.
        const result = await User.create({email,password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: '1hr'});

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: 'Something Went Wrong'});
    }
}