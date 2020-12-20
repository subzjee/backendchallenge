"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticate(req, res, next) {
    if (req.headers.authorization) {
        var _a = req.headers.authorization.split(' '), prefix = _a[0], token = _a[1], rest = _a.slice(2);
        if (prefix === "Bearer") {
            jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, user) {
                if (err) {
                    return res.sendStatus(403);
                }
                req.body.user = user;
                next();
            });
        }
    }
    res.sendStatus(401);
}
exports.default = authenticate;
;
