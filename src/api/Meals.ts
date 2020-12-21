const express = require('express');
import { Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import authenticate from './middleware/authenticate';
import { validateParams } from './middleware/validateMeal';

const Meal = require('../models/Meal');
const Ingredient = require('../models/Ingredient');

const router: Router = express.Router();


/*
Create new meal.
*/
router.post("/api/meals", authenticate, validateParams, async (req: Request, res: Response) => {
    const meal: Document = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients,
        user_id: req.body.user_id
    });

    await meal.save();
    res.status(201);
    res.location(`/api/meals/${meal._id}`);
    res.send(meal);
})


/*
Get all meals by user ID.
*/
router.get("/api/meals", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const meals: Array<object> = await Meal.find({ user_id: userId });
        res.send(meals);
    } catch {
        res.sendStatus(404);
    }
});

/*
Get specific meal by resource ID.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.get("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });
        
        (meal.user_id === userId) ? res.send(meal) : res.sendStatus(403);
    } catch {
        res.sendStatus(404);
    }
})

/*
Update existing meal through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/meals/:id", authenticate, validateParams, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });

        if (meal.user_id === userId) {
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

/*
Delete specific meal, as indicated by resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.delete("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });

        if (meal.user_id === userId) {
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