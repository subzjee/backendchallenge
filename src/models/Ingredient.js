"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var validatorsNutritional = [
    { validator: hasAllValues, msg: 'Need carbs, protein and fats' },
    { validator: exactLength, msg: 'Can only hold carbs, protein and fats' }
];
function hasAllValues(val) {
    return val.has('carbs') && val.has('fats') && val.has('protein');
}
function exactLength(val) {
    return val.size === 3;
}
var ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    nutritional_vals: {
        type: Map,
        of: Number,
        required: true,
        validate: validatorsNutritional
    },
    calories: {
        type: Number,
        required: true,
        min: [1, 'Too low amount of calories']
    },
    user_id: {
        type: String,
        required: true
        // validate: ["USER EXISTS"]
    }
});
module.exports = mongoose.model("Ingredient", ingredientSchema);