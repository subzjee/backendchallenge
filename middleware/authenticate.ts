const express = require('express');
import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');

require('dotenv').config()

interface DecodedToken {
    username: string,
    user_id: string
}

/*
Middleware to provide JWT authentication.
*/
export default function authenticate(req: Request, res: Response, next: any) {
    if (req.headers.authorization) {
        const [ prefix, token, ...rest ] = req.headers.authorization.split(' ');
        
        if (prefix === "Bearer") {
            jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
    
                req.body.user = user;
                next();
            });
        }
    } else {
        res.sendStatus(401);
    }
};