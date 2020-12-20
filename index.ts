import express = require('express');
import mongoose = require('mongoose');

const ingredientRoutes = require('./routes/Ingredients');
const authRoutes = require('./routes/Auth');

require('dotenv').config()

const app: express.Application = express();

app.use(express.json());
app.use("/", ingredientRoutes);
app.use("/", authRoutes);

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.gxuv0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.SV_PORT)
    }).catch((err) => {
        console.log(err);
    })