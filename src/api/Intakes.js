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
var Intake = require('../models/Intake');
var Meal = require('../models/Meal');
var router = express.Router();
/*
Create new intake.
*/
router.post("/api/intakes", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var found, intake;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Meal.findOne({ _id: req.body.meal_id })];
            case 1:
                found = _a.sent();
                // Check if meal exists.
                if (!found) {
                    res.status(400);
                    res.send("Meal ID is invalid");
                    return [2 /*return*/];
                }
                intake = new Intake({
                    dateTime: req.body.time,
                    meal_id: req.body.meal_id,
                    amount: req.body.amount,
                    user_id: req.body.user_id
                });
                return [4 /*yield*/, intake.save()];
            case 2:
                _a.sent();
                res.status(201);
                res.location("/api/intakes/" + intake._id);
                res.send(intake);
                return [2 /*return*/];
        }
    });
}); });
/*
Get all intakes by user ID.
*/
router.get("/api/intakes", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, intakes, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Intake.find({ user_id: userId })];
            case 2:
                intakes = _b.sent();
                res.send(intakes);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*
Get a specific intake by resource ID.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.get("/api/intakes/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, intake, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Intake.findOne({ _id: req.params.id })];
            case 2:
                intake = _b.sent();
                if (intake.user_id === userId) {
                    res.send(intake);
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
/*
Update existing intake through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/intakes/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, intake, found, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.user_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Intake.findOne({ _id: req.params.id })];
            case 2:
                intake = _b.sent();
                if (!(intake.user_id === userId)) return [3 /*break*/, 6];
                if (req.body.time) {
                    intake.time = req.body.time;
                }
                if (!req.body.meal_id) return [3 /*break*/, 4];
                return [4 /*yield*/, Meal.findOne({ _id: req.body.meal_id })];
            case 3:
                found = _b.sent();
                // Check if meal exists.
                if (!found) {
                    res.status(400);
                    res.send("Meal ID is invalid");
                    return [2 /*return*/];
                }
                intake.meal_id = req.body.meal_id;
                _b.label = 4;
            case 4:
                if (req.body.amount) {
                    intake.amount = req.body.amount;
                }
                return [4 /*yield*/, intake.save()];
            case 5:
                _b.sent();
                res.send(intake);
                return [3 /*break*/, 7];
            case 6:
                res.sendStatus(403);
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                _a = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
/*
Delete specific intake, as indicated by resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.delete("/api/intakes/:id", authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, intake, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = req.body.user_id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Intake.findOne({ _id: req.params.id })];
            case 2:
                intake = _c.sent();
                if (!(intake.user_id === userId)) return [3 /*break*/, 7];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, Intake.deleteOne({ _id: req.params.id })];
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
