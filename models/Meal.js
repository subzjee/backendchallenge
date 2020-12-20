"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var mealIngredientSchema = mongoose.Schema({
    name: {
        type: Map,
        of: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
var mealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    ingredients: {
        type: [mealIngredientSchema],
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Meal", mealSchema);
