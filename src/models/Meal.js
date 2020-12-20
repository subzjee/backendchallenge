"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var mealIngredientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
        // validate: ["INGREDIENT EXISTS"]
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Too low amount of ingredient']
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
        // validate: ["POSITIVE AMOUNT"]
    },
    user_id: {
        type: String,
        required: true
        // validate: ["USER EXISTS"]
    }
});
module.exports = mongoose.model("Meal", mealSchema);
