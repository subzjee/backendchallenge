const mongoose = require('mongoose');

const mealIngredientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}) 

const mealSchema = mongoose.Schema({
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
})

module.exports = mongoose.model("Meal", mealSchema);

export {}