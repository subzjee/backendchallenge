const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');

import config from '../config';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { LoginInfo } from '../interfaces';

const User = require('../models/User');
const router = express.Router();

/*
Verifies if the given username doesn't already exist.
If it doesn't exist, create new user.
Otherwise, throw 403.
*/
router.post('/api/register', async (req: Request, res: Response) => {
    const password: string = crypto
                        .createHash('sha512')
                        .update(req.body.password).digest('hex');

    const user = await User.findOne({username: req.body.username});

    if (user) {
        res.sendStatus(403);
    } else {
        try {
            const user: Document = new User({
                username: req.body.username,
                password
            });

            await user.save();
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    }
});

/*
Verify the provided username and password.
If valid, generate JWT token and return it.
*/
router.get('/api/login', async (req: Request, res: Response) => {
    let {username, password}: LoginInfo = req.body;

    password = crypto
                    .createHash('sha512')
                    .update(req.body.password).digest('hex');

    try {
        const user = await User.findOne({username: username,
                                         password: password});

        if (user) {
            const generatedToken: string = jwt.sign({username: username,
                                             user_id: user._id},
                                             config.jwtToken);
            
            res.json({
                token: generatedToken,
            });
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(404);
    }
});

module.exports = router;
