const mongoose = require('mongoose');

import { userExists } from './utils';

const Meal = require('./Meal');

const intakeSchema = mongoose.Schema({
    dateTime: {
        type: Number,
        required: true,
        validate: {
            validator: (val: Number) => {
                const now = new Date().getTime();
                return (val <= now)
            },
            msg: 'Time can not be in future'
        }
    },
    meal_id: {
        type: String,
        required: true,
        validate: {
            validator: async (val: string) => {
                return await Meal.findOne({_id: val});
            },
            msg: 'Meal does not exist'
        }
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Need positive amount of meals']
    },
    user_id: {
        type: String,
        required: true,
        validate: [userExists, 'User does not exist']
    }
})

module.exports = mongoose.model("Intake", intakeSchema);

export {}