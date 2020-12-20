const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');
import { Request, Response } from 'express';

const User = require('../models/User');
const router = express.Router();

require('dotenv').config()

/*
Verifies if the given username doesn't already exist.
If it doesn't exist, create new user.
Otherwise, throw 403.
*/
router.post("/api/register", async (req: Request, res: Response) => {
    const password = crypto.createHash('sha512').update(req.body.password).digest('hex');
    const user_id = crypto.createHash('md5').update(req.body.username).digest('hex');

    const user = await User.findOne({ username: req.body.username });

    if (user) {
        res.sendStatus(403);
    } else {
        try {
            const user = new User({
                username: req.body.username,
                password,
                user_id
            });
        
            await user.save();
            res.sendStatus(201);
        } catch {
            res.sendStatus(404);
        }
    }
})

/*
Verify the provided username and password.
If valid, generate JWT token and return it.
*/
router.get("/api/login", async (req: Request, res: Response) => {
    let { username, password } = req.body;

    password = crypto.createHash('sha512').update(req.body.password).digest('hex');

    try {
        const user = await User.findOne({ username: username, password: password });

        if (user) {
            const generatedToken = jwt.sign({ username: username, user_id: user.user_id}, process.env.JWT_TOKEN_SECRET);
        
            res.json({
                token: generatedToken
            });
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(404);
    }
});

module.exports = router;