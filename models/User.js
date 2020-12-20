"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model("User", userSchema);
