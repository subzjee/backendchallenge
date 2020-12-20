"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require('dotenv');
dotenv.config();
exports.default = {
    port: process.env.SV_PORT,
    dbUrl: process.env.DB_URL,
    jwtToken: process.env.JWT_SECRET
};
