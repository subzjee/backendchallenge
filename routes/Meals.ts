const express = require('express');
import { Request, Response, Router } from 'express';
import { DecodedToken } from '../interfaces';
import authenticate from '../middleware/authenticate';

const Meal = require('../models/Meal');
const Ingredient = require('../models/Ingredient')

const router: Router = express.Router();

router.post("/api/meals", authenticate, async (req: Request, res: Response) => {
    for (const ingredient of req.body.ingredients) {
        const found = await Ingredient.find({ _id: ingredient['id'] });

        if (found.length === 0) {
            res.status(400);
            res.send("Ingredient ID is invalid");
            return;
        }
    }

    const meal = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients,
        user_id: req.body.user_id
    });

    await meal.save();
    res.status(201);
    res.location(`/api/ingredients/${meal._id}`);
    res.send(meal);
})

router.get("/api/meals", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;

    try {
        const meals = await Meal.find({ user_id: user_id });
        res.send(meals);
    } catch {
        res.sendStatus(404);
    }
});

router.get("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;

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
    const user_id = req.body.user_id;

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
    const user_id = req.body.user_id;

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