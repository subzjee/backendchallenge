const mongoose = require('mongoose');

const intakeSchema = mongoose.Schema({
    dateTime: {
        type: String,
        required: true,
        // validate: ["NOT IN FUTURE"]
    },
    meal_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Need positive amount of meals']
    },
    user_id: {
        type: String,
        required: true,
        // validate: ["USER EXISTS"]
    }
})

module.exports = mongoose.model("Intake", intakeSchema);

export {}