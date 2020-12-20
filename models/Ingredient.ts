const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: String,
    nutritional_vals: {
        type: Map,
        of: Number
    },
    calories: Number
})

module.exports = mongoose.model("Ingredient", ingredientSchema);