import { Request, Response, NextFunction } from 'express';

const User = require('../../models/User');
const HTTPError = require('http-errors');

/*
Middleware to validate parameters for registration.
*/
export default async function validateRegister(req: Request,
                                     res: Response, next: NextFunction) {
    const user = await User.findOne({username: req.body.username});

    if (user) {
        next(new HTTPError(403, "Username already exists"));
    } else {
        next();
    }
};
