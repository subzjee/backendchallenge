const express = require('express');
import { Request, Response, Router } from 'express';
import { DecodedToken } from '../interfaces';
import authenticate from '../middleware/authenticate';

const Intake = require('../models/Intake');

const router: Router = express.Router();

router.post("/api/intakes", authenticate, async (req: Request, res: Response) => {
    const found = await Intake.find({ _id : req.body.meal_id });

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
    res.location(`/api/ingredients/${intake._id}`);
    res.send(intake);
})

router.get("/api/intakes", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;

    try {
        let intakes = await Intake.find({ user_id: user_id });
        res.send(intakes);
    } catch {
        res.sendStatus(404);
    }
});

router.get("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;
})

router.patch("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;
})

router.delete("/api/intakes/:id", authenticate, async (req: Request, res: Response) => {
    const user_id = req.body.user_id;
})

module.exports = router;