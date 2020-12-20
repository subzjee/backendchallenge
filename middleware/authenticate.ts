const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express';
import {DecodedToken} from '../interfaces';

require('dotenv').config();

/*
Middleware to provide JWT authentication.
*/
export default function authenticate(req: Request,
                                     res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        const [prefix, token, ...rest] = req.headers.authorization.split(' ');

        if (prefix === 'Bearer') {
            jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err: any, user: DecodedToken) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.body.user_id = user.user_id;
                next();
            });
        }
    } else {
        res.sendStatus(401);
    }
};
