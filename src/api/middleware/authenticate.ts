const jwt = require('jsonwebtoken');
const HTTPError = require('http-errors');

import config from '../../config';
import { Request, Response, NextFunction } from 'express';
import { IDecodedToken } from '../../interfaces';

/*
Middleware to provide JWT authentication.
*/
export default function authenticate(req: Request,
                                     res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        const [prefix, token, ...rest] = req.headers.authorization.split(' ');

        if (prefix === 'Bearer') {
            jwt.verify(token, config.jwtToken, (err: any, user: IDecodedToken) => {
                if (err) {
                    next(new HTTPError(403));
                }

                req.body.user_id = user.user_id;
                next();
            });
        }
    } else {
        next(new HTTPError(401));
    }
};
