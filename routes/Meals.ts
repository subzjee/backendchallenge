const express = require('express');
import { Request, Response } from 'express';
import authenticate from '../middleware/authenticate';

const Meal = require('../models/Meal');

const router = express.Router();

router.post("/api/meals", authenticate, async (req: Request, res: Response) => {
})

router.get("/api/meals", authenticate, async (req: Request, res: Response) => {
    const { username, user_id } = req.body.user;

    try {
        let meals = await Meal.find({ user_id: user_id });
        res.send(meals);
    } catch {
        res.sendStatus(404);
    }
});

router.get("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
})

router.patch("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
})

router.delete("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
})

module.exports = router;