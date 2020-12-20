const express = require('express');
import { Request, Response } from 'express';
import authenticate from '../middleware/authenticate';

const Ingredient = require('../models/Ingredient');

const router = express.Router();

/*
Create new ingredient.
*/
router.post("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    const ingredient = new Ingredient({
        name: req.body.name,
        nutritional_vals: req.body.nutritional_vals,
        calories: req.body.calories,
        user_id: req.body.user.user_id
    });

    await ingredient.save();
    res.status(201);
    res.location(`/api/ingredients/${ingredient._id}`);
    res.send(ingredient);
})

/*
Get all ingredients by owner's user_id.
*/
router.get("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    const { username, user_id } = req.body.user;

    try {
        let ingredients = await Ingredient.find({ user_id: user_id });
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
    const { username, user_id } = req.body.user;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });
        
        if (ingredient.user_id === user_id) {
            res.send(ingredient);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})

/*
Update existing resource through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    const { username, user_id } = req.body.user;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });

        if (ingredient.user_id === user_id) {
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
    const { username, user_id } = req.body.user;

    try {
        const ingredient = await Ingredient.findOne({ _id: req.params.id });

        if (ingredient.user_id === user_id) {
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