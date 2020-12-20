const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: String,
    nutritional_vals: {
        type: Map,
        of: Number
    },
    calories: Number,
    user_id: String
})

module.exports = mongoose.model("Ingredient", ingredientSchema);