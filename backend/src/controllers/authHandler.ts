import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

export const SignUpHandler = async (req: Request, res: Response) => {
    try {
        const { userName, password, role, email } = req.body;

        console.log("req.body--->",req.body)

        if (!userName || !password || !role || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this username or email already exists'
            });
        }

        const hashedPassword: string = await bcrypt.hash(password.toString(), 10);
        await userModel.create({ userName, password: hashedPassword, role, email });

        return res.status(201).json({
            success: true,
            message: 'User successfully signed up',
            data:{
                userName,
                role
            }
        });
    } catch (error: any) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while signing up',
            error: error.message
        });
    }
};

export const SignInHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'email and password are required'
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isValidPassword = await bcrypt.compare(password.toString(), user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            success: true,
            message: 'User successfully signed in',
            token,
            data:{
                userName:user.userName,
                role:user.role
            }
        });
    } catch (error: any) {
        console.error('Signin error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while signing in',
            error: error.message
        });
    }
};