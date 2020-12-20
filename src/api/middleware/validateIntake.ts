import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';

const Meal = require('../../models/Meal');

/*
Validate that the provided meal ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertMealExistsInDb(id: string, res: Response) {
    try {
        const found = await Meal.findOne({_id: id});

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

/*
Validate that the given amount of positive.
*/
function assertPositiveAmount(amount: Number, res: Response) {
    if (amount <= 0) {
        res.status(400).send("Amount has to be positive");
        return false;
    }

    return true;
}

/*
Compares given time in milliseconds to current time.
Returns true if given time is in the past or now.
*/
function assertTimeNotInFuture(datetime: Number, res: Response) {
    const now = new Date().getTime();
    if (datetime > now) {
        res.status(400).send("Time can't be in the future");
        return false;
    } else {
        return true;
    }
}

/*
Middleware to validate GET parameters for Ingredient.
*/
export async function validatePost(req: Request,
                                   res: Response, next: NextFunction) {
    if (assertPositiveAmount(req.body.amount, res)
            && assertTimeNotInFuture(req.body.time, res)
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
    let validTime: boolean = true;

    if (req.body.amount) {
        validAmount = assertPositiveAmount(req.body.amount, res);
    }

    if (req.body.meal_id) {
        validMealId = await assertMealExistsInDb(req.body.meal_id, res);
    }

    if (req.body.time) {
        validTime = assertTimeNotInFuture(req.body.time, res);
    }

    if (validAmount && validMealId && validTime) {
        next();
    } else {
        res.sendStatus(400);
    }
};