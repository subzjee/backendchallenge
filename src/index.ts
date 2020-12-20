import express = require('express');
import mongoose = require('mongoose');
import config from './config';
const ingredientRoutes = require('./api/Ingredients');
const authRoutes = require('./api/Auth');
const mealRoutes = require('./api/Meals');
const intakeRoutes = require('./api/Intakes')

const app: express.Application = express();

// Setup Express to parse JSON body as middleware.
app.use(express.json());

// Import routes into router.
app.use("/", authRoutes, ingredientRoutes, mealRoutes, intakeRoutes);

config.dbUrl = config.dbUrl ?? "";

// Connect to database and start server if connection is successful.
mongoose
    .connect(config.dbUrl,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`)
        });
    }).catch((err) => {
        console.log(err);
    })