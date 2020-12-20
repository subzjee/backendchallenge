const express = require('express');
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import authenticate from '../middleware/authenticate';

const Ingredient = require('../models/Ingredient');

const router = express.Router();

/*
Create new ingredient.
*/
router.post("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    try {
        const ingredient: Document = new Ingredient({
            name: req.body.name,
            nutritional_vals: req.body.nutritional_vals,
            calories: req.body.calories,
            user_id: req.body.user_id
        });
    
        await ingredient.save();

        res.location(`/api/ingredients/${ingredient._id}`);
        res.status(201).send(ingredient);
    } catch {
        res.sendStatus(400);
    }
})

/*
Get all ingredients by user ID.
*/
router.get("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        let ingredients: Array<object> = await Ingredient.find({ user_id: userId });
        res.send(ingredients);
    } catch {
        res.sendStatus(404);
    }
});

/*
Get a specific ingredient by resource ID.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.get("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });

        (ingredient.user_id === userId) ? res.send(ingredient) : res.sendStatus(403);
    } catch {
        res.sendStatus(404);
    }
})

/*
Update existing ingredient through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });

        if (ingredient.user_id === userId) {
            if (req.body.name) {
                ingredient.name = req.body.name;
            }
    
            if (req.body.nutritional_vals) {
                ingredient.nutritional_vals = req.body.nutritional_vals;
            }
    
            if (req.body.calories) {
                ingredient.calories = req.body.calories;
            }
    
            await ingredient.save();
            res.send(ingredient);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

/*
Delete specific ingredient, as indicated by resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.delete("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    const userId: string = req.body.user_id;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });

        if (ingredient.user_id === userId) {
            try {
                await Ingredient.deleteOne({ _id: req.params.id });
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