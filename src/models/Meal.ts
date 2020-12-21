const mongoose = require('mongoose');

import { IIngredient } from '../interfaces';
import { userExists } from './utils';

const Ingredient = require('./Ingredient');

const mealIngredientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        validate: {
            validator: async (val: string) => {
                return await Ingredient.findOne({_id: val});
            },
            msg: 'Ingredient does not exist'
        }
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Too low amount of ingredient']
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
        required: true,
        validate: {
            validator: (val: Array<IIngredient>) => {
                return val.length > 0
            },
            msg: 'Meal has to contain ingredients'
        }
    },
    user_id: {
        type: String,
        required: true,
        validate: [userExists, 'User does not exist']
    }
})

module.exports = mongoose.model("Meal", mealSchema);

export {}