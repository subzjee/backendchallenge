"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    user_id: String
});
module.exports = mongoose.model("User", userSchema);
