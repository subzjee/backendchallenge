"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var ingredientRoutes = require('./routes/Ingredients');
var authRoutes = require('./routes/Auth');
var mealRoutes = require('./routes/Meals');
require('dotenv').config();
var app = express();
app.use(express.json());
app.use("/", authRoutes);
app.use("/", ingredientRoutes);
app.use("/", mealRoutes);
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PW + "@cluster0.gxuv0.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(process.env.SV_PORT);
}).catch(function (err) {
    console.log(err);
});
