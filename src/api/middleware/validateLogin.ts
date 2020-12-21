import { Request, Response, NextFunction } from 'express';

const crypto = require('crypto');
const User = require('../../models/User');
const HTTPError = require('http-errors');

/*
Middleware to validate parameters for registration.
*/
export default async function validateLogin(req: Request,
                                     res: Response, next: NextFunction) {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        next(new HTTPError(403, "Username doesn't exist"));
    } else {
        const password = crypto
                    .createHash('sha512')
                    .update(req.body.password).digest('hex');
        if (user.password === password) {
            req.body.user = user;
            next();
        } else {
            next(new HTTPError(403, "Wrong password"));
        }
    }
};
