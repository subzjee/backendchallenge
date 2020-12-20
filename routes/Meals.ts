const express = require('express');
import { Request, Response, Router } from 'express';
import { DecodedToken } from '../interfaces';
import authenticate from '../middleware/authenticate';

const Meal = require('../models/Meal');
const Ingredient = require('../models/Ingredient');

const router: Router = express.Router();


/*
Create new meal.
*/
router.post("/api/meals", authenticate, async (req: Request, res: Response) => {
    // Go through ingredients and check if they exist in database.
    for (const ingredient of req.body.ingredients) {
        const found = await Ingredient.findOne({ _id: ingredient['id'] });

        if (!found) {
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
    res.location(`/api/meals/${meal._id}`);
    res.send(meal);
})


/*
Get all meals by user ID.
*/
router.get("/api/meals", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const meals = await Meal.find({ user_id: userId });
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
    const userId = req.body.user_id;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });
        
        if (meal.user_id === userId) {
            res.send(meal);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

/*
Update existing meal through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/meals/:id", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const meal = await Meal.findOne({ _id: req.params.id });

        if (meal.user_id === userId) {
            if (req.body.name) {
                meal.name = req.body.name;
            }
    
            if (req.body.ingredients) {
                // Go through ingredients and check if they exist in database.
                for (const ingredient of req.body.ingredients) {
                    const found = await Ingredient.findOne({ _id: ingredient['id'] });

                    if (!found) {
                        res.status(400);
                        res.send("Ingredient ID is invalid");
                        return;
                    }
                }

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
    const userId = req.body.user_id;

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