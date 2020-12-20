import { Request, Response, NextFunction } from 'express';

const User = require('../../models/User');

/*
Middleware to validate parameters for registration.
*/
export default async function validateRegister(req: Request,
                                     res: Response, next: NextFunction) {
    const user = await User.findOne({username: req.body.username});

    if (user) {
        res.status(403).send("Username already exists");
    } else {
        next();
    }
};
