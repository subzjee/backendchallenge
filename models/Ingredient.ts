const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    nutritional_vals: {
        type: Map,
        of: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Ingredient", ingredientSchema);