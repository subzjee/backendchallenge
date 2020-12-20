import { assert } from 'console';
import { Request, Response, NextFunction } from 'express';

const Meal = require('../models/Meal');

/*
Validate that the provided meal ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertMealExistsInDb(id: string, res: Response) {
    try {
        const found = await Meal.findOne({_id: id});

        console.log(found);

        // Check if meal exists.
        if (!found) {
            res.status(400).send("Meal ID is invalid");
            return false;
        }
    
        return true;
    } catch (err) {
        console.log(err);
    }

    return false;
}

function assertPositiveAmount(amount: Number, res: Response) {
    if (amount <= 0) {
        res.status(400).send("Amount has to be positive");
        return false;
    }

    return true;
}

/*
Middleware to validate GET parameters for Ingredient.
*/
export async function validatePost(req: Request,
                                   res: Response, next: NextFunction) {
    if (assertPositiveAmount(req.body.amount, res)
            && await assertMealExistsInDb(req.body.meal_id, res)) {
        next();
    } else {
        res.sendStatus(400);
    }

};

/*
Middleware to validate PATCH parameters for Ingredient.
*/
export async function validatePatch(req: Request,
                                    res: Response, next: NextFunction) {

    let validAmount: boolean = true;
    let validMealId: boolean = true;

    if (req.body.amount) {
        validAmount = assertPositiveAmount(req.body.amount, res);
    }

    if (req.body.meal_id) {
        validMealId = await assertMealExistsInDb(req.body.meal_id, res);
    }

    if (validAmount && validMealId) {
        next();
    } else {
        res.sendStatus(400);
    }
};