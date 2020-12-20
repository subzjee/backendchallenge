"use strict";
var mongoose = require('mongoose');
var ingredientSchema = mongoose.Schema({
    name: String,
    nutritional_vals: {
        type: Map,
        of: Number
    },
    calories: Number,
    user_id: String
});
module.exports = mongoose.model("Ingredient", ingredientSchema);
