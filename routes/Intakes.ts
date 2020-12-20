const express = require('express');
import {Request, Response, Router} from 'express';
import authenticate from '../middleware/authenticate';

const Intake = require('../models/Intake');
const Meal = require('../models/Meal');

const router: Router = express.Router();

/*
Create new intake.
*/
router.post("/api/intakes", authenticate, async (req: Request, res: Response) => {
    const found = await Meal.find({_id: req.body.meal_id});

    // Check if meal exists.
    if (found.length === 0) {
        res.status(400);
        res.send("Meal ID is invalid");
        return;
    }

    const intake = new Intake({
        dateTime: req.body.time,
        meal_id: req.body.meal_id,
        amount: req.body.amount,
        user_id: req.body.user_id
    });

    await intake.save();
    res.status(201);
    res.location(`/api/intakes/${intake._id}`);
    res.send(intake);
});

/*
Get all intakes by user ID.
*/
router.get("/api/intakes", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        let intakes = await Intake.find({ user_id: userId });
        res.send(intakes);
    } catch {
        res.sendStatus(404);
    }
});

/*
Get a specific intake by resource ID.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.get("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const intake = await Intake.findOne({ _id: req.params.id });
        
        if (intake.user_id === userId) {
            res.send(intake);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})


/*
Update existing intake through resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.patch("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const intake = await Intake.findOne({ _id: req.params.id });

        if (intake.user_id === userId) {
            if (req.body.time) {
                intake.time = req.body.time;
            }
    
            if (req.body.meal_id) {
                const found = await Meal.find({_id: req.body.meal_id});

                // Check if meal exists.
                if (found.length === 0) {
                    res.status(400);
                    res.send("Meal ID is invalid");
                    return;
                }
                
                intake.meal_id = req.body.meal_id;
            }
    
            if (req.body.amount) {
                intake.amount = req.body.amount;
            }
    
            await intake.save();
            res.send(intake);
        } else {
            res.sendStatus(403);
        }
    } catch {
        res.sendStatus(404);
    }
})


/*
Delete specific intake, as indicated by resource ID param.
If the resource exists but it isn't owned by the requesting user, it will throw a 403.
*/
router.delete("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const userId = req.body.user_id;

    try {
        const intake = await Intake.findOne({ _id: req.params.id });

        if (intake.user_id === userId) {
            try {
                await Intake.deleteOne({ _id: req.params.id });
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