const mongoose = require('mongoose');

var validatorsNutritional = [
    { validator: hasAllValues, msg: 'Need carbs, protein and fats' },
    { validator: exactLength, msg: 'Can only hold carbs, protein and fats' }
];

function hasAllValues(val: any) {
    return val.has('carbs') && val.has('fats') && val.has('protein');
}

function exactLength(val: any) {
    return val.size === 3;
}

const ingredientSchema = mongoose.Schema({
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
        min: [0, 'Too low amount of calories']
    },
    user_id: {
        type: String,
        required: true
        // validate: ["USER EXISTS"]
    }
})

module.exports = mongoose.model("Ingredient", ingredientSchema);

export {}