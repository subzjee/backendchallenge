import express = require('express');
import mongoose = require('mongoose');

const ingredientRoutes = require('./routes/Ingredients');
const authRoutes = require('./routes/Auth');
const mealRoutes = require('./routes/Meals');
const intakeRoutes = require('./routes/Intakes')

require('dotenv').config();

const app: express.Application = express();

// Setup Express to parse JSON body as middleware.
app.use(express.json());

// Import routes into router.
app.use("/", authRoutes, ingredientRoutes, mealRoutes, intakeRoutes);

// Connect to database and start server if connection is successful.
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.gxuv0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.SV_PORT)
    }).catch((err) => {
        console.log(err);
    })