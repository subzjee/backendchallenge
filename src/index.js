"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var config_1 = __importDefault(require("./config"));
var ingredientRoutes = require('./api/Ingredients');
var authRoutes = require('./api/Auth');
var mealRoutes = require('./api/Meals');
var intakeRoutes = require('./api/Intakes');
var app = express();
// Setup Express to parse JSON body as middleware.
app.use(express.json());
// Import routes into router.
app.use("/", authRoutes, ingredientRoutes, mealRoutes, intakeRoutes);
config_1.default.dbUrl = (_a = config_1.default.dbUrl) !== null && _a !== void 0 ? _a : "";
// Connect to database and start server if connection is successful.
mongoose
    .connect(config_1.default.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log("Connected to database");
    app.listen(config_1.default.port, function () {
        console.log("Server is listening on port " + config_1.default.port);
    });
}).catch(function (err) {
    console.log(err);
});
