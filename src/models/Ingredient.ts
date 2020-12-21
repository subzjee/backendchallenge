const mongoose = require('mongoose');

import { userExists } from './utils';

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
        validate: [
            { validator: (val: any) => {
                return val.has('carbs') && val.has('fats') && val.has('protein');
            }, msg: 'Need carbs, protein and fats' },
            { validator: (val: any) => {return val.size === 3}, msg: 'Can only hold carbs, protein and fats' }
        ]
    },
    calories: {
        type: Number,
        required: true,
        min: [0, 'Too low amount of calories']
    },
    user_id: {
        type: String,
        required: true,
        validate: [userExists, 'User does not exist']
    }
})

module.exports = mongoose.model("Ingredient", ingredientSchema);

export {}