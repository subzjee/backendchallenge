"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var authenticate_1 = __importDefault(require("../middleware/authenticate"));
var Meal = require('../models/Meal');
var router = express.Router();
router.post("/api/meals", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, ingredient, found, meal;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = req.body.ingredients;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                ingredient = _a[_i];
                return [4 /*yield*/, Meal.find({ user_id: ingredient['id'] })];
            case 2:
                found = _b.sent();
                if (found.length === 0) {
                    res.status(400);
                    res.send("Meal ID is invalid");
                    return [2 /*return*/];
                }
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                meal = new Meal({
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    user_id: req.body.user_id
                });
                return [4 /*yield*/, meal.save()];
            case 5:
                _b.sent();
                res.status(201);
                res.location("/api/ingredients/" + meal._id);
                res.send(meal);
                return [2 /*return*/];
        }
    });
}); });
router.get("/api/meals", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, meals, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Meal.find({ user_id: user_id })];
            case 2:
                meals = _b.sent();
                res.send(meals);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/api/meals/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, meal, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Meal.findOne({ _id: req.params.id })];
            case 2:
                meal = _b.sent();
                if (meal.user_id === user_id) {
                    res.send(meal);
                }
                else {
                    res.sendStatus(403);
                }
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.patch("/api/meals/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, meal, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Meal.findOne({ _id: req.params.id })];
            case 2:
                meal = _b.sent();
                if (!(meal.user_id === user_id)) return [3 /*break*/, 4];
                if (req.body.name) {
                    meal.name = req.body.name;
                }
                if (req.body.ingredients) {
                    meal.ingredients = req.body.ingredients;
                }
                return [4 /*yield*/, meal.save()];
            case 3:
                _b.sent();
                res.send(meal);
                return [3 /*break*/, 5];
            case 4:
                res.sendStatus(403);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                _a = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.delete("/api/meals/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, meal, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                user_id = req.body.user_id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Meal.findOne({ _id: req.params.id })];
            case 2:
                meal = _c.sent();
                if (!(meal.user_id === user_id)) return [3 /*break*/, 7];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, Meal.deleteOne({ _id: req.params.id })];
            case 4:
                _c.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = _c.sent();
                res.sendStatus(404);
                return [3 /*break*/, 6];
            case 6:
                res.sendStatus(204);
                return [3 /*break*/, 8];
            case 7:
                res.sendStatus(403);
                _c.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                _b = _c.sent();
                res.sendStatus(404);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
