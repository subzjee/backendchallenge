"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ingredientRoutes = require('./routes/Ingredients');
var authRoutes = require('./routes/Auth');
require('dotenv').config();
var app = express();
app.use(express.json());
app.use("/", ingredientRoutes);
app.use("/", authRoutes);
app.listen(process.env.SV_PORT);
// mongoose
//     .connect(`mongodb+srv://<${process.env.DB_USER}>:<${process.env.DB_PW}>@cluster0.gxuv0.mongodb.net/<${process.env.DB_NAME}>?retryWrites=true&w=majority`,
//         { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         app.listen(process.env.SV_PORT)
//     }).catch((err) => {
//         console.log(err);
//     })
