const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');
import { Request, Response } from 'express';

const User = require('../models/User');
const router = express.Router();

require('dotenv').config()

router.post("/api/register", async (req: Request, res: Response) => {
    const password = crypto.createHash('sha512').update(req.body.password).digest('hex');
    const user_id = crypto.createHash('md5').update(req.body.username).digest('hex');

    const user = await User.findOne({ username: req.body.username, password: password });

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

router.get("/api/login", async (req: Request, res: Response) => {
    let { username, password } = req.body;

    password = crypto.createHash('sha512').update(req.body.password).digest('hex');

    try {
        const user = await User.findOne({ username: username, password: password });
        const generatedToken = jwt.sign({ username: username, user_id: user.user_id}, process.env.JWT_TOKEN_SECRET);
        
        res.json({
            token: generatedToken
        });
    } catch {
        res.sendStatus(404);
    }
});

module.exports = router;