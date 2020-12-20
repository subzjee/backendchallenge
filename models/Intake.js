"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var intakeSchema = mongoose.Schema({
    dateTime: {
        type: String,
        required: true,
    },
    meal_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Intake", intakeSchema);
