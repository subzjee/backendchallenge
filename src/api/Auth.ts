const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');

import config from '../config';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { LoginInfo } from '../interfaces';
import validateRegister from '../middleware/validateRegister';
import validateLogin from '../middleware/validateLogin';

const User = require('../models/User');
const router = express.Router();

/*
Verifies if the given username doesn't already exist.
If it doesn't exist, create new user.
Otherwise, throw 403.
*/
router.post('/api/register', validateRegister, async (req: Request, res: Response) => {
    const password: string = crypto
                        .createHash('sha512')
                        .update(req.body.password).digest('hex');

    try {
        const user: Document = new User({
            username: req.body.username,
            password
        });

        await user.save();
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

/*
Verify the provided username and password.
If valid, generate JWT token and return it.
*/
router.get('/api/login', validateLogin, async (req: Request, res: Response) => {
    let {username, password}: LoginInfo = req.body;

    password = crypto
                    .createHash('sha512')
                    .update(req.body.password).digest('hex');

    const generatedToken: string = jwt.sign({username: req.body.user.username,
        user_id: req.body.user._id},
        config.jwtToken);

    res.json({
    token: generatedToken,
    });
});

module.exports = router;
