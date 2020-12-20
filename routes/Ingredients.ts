const express = require('express');
import { Request, Response } from 'express';
import authenticate from '../middleware/authenticate';

const Ingredient = require('../models/Ingredient');

const router = express.Router();

router.post("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    const ingredient = new Ingredient({
        name: req.body.name,
        nutritional_vals: req.body.nutritional_vals,
        calories: req.body.calories
    });

    await ingredient.save();
    res.status(201);
    res.send(ingredient);
})

router.get("/api/ingredients", authenticate, async (req: Request, res: Response) => {
    const ingredients = await Ingredient.find({});
    res.send(req);
});

router.get("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    const ingredient = await Ingredient.findOne({ _id: req.params.id });
    res.send(ingredient);
})

router.patch("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {
    
})

router.delete("/api/ingredients/:id", authenticate, async (req: Request, res: Response) => {

})

module.exports = router;