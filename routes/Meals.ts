const express = require('express');
import { Request, Response } from 'express';
import authenticate from '../middleware/authenticate';

const Meal = require('../models/Meal');

const router = express.Router();

router.post("/api/meals", authenticate, async (req: Request, res: Response) => {
    const meal = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients,
        user_id: req.body.user.user_id
    });

    await meal.save();
    res.status(201);
    res.location(`/api/ingredients/${meal._id}`);
    res.send(meal);
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
    const { username, user_id } = req.body.user;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });
        
        if (meal.user_id === user_id) {
            res.send(meal);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

router.patch("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const { username, user_id } = req.body.user;

    console.log("test");

    try {
        const meal = await Meal.findOne({ _id: req.params.id });

        if (meal.user_id === user_id) {
            if (req.body.name) {
                meal.name = req.body.name;
            }
    
            if (req.body.ingredients) {
                meal.ingredients = req.body.ingredients;
            }
    
            await meal.save();
            res.send(meal);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

router.delete("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const { username, user_id } = req.body.user;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });

        if (meal.user_id === user_id) {
            try {
                await Meal.deleteOne({ _id: req.params.id });
            } catch {
                res.sendStatus(404);
            }
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

module.exports = router;