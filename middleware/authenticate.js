"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticate(req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, user) {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = authenticate;
;
