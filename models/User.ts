const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    user_id: String
})

module.exports = mongoose.model("User", userSchema);

export {}