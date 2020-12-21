import { Request, Response, NextFunction } from 'express';

const HTTPError = require('http-errors');
const Meal = require('../../models/Meal');

/*
Validate that the provided meal ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertMealExistsInDb(id: string) {
    try {
        const found = await Meal.findOne({_id: id});

        // Check if meal exists.
        if (!found) {
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
function assertPositiveAmount(amount: Number) {
    if (amount <= 0) {
        return false;
    }

    return true;
}

/*
Compares given time in milliseconds to current time.
Returns true if given time is in the past or now.
*/
function assertTimeNotInFuture(datetime: Number) {
    const now = new Date().getTime();
    if (datetime > now) {
        return false;
    } else {
        return true;
    }
}

/*
Middleware to validate PUT/PATCH parameters for Intake.
*/
export async function validateParams(req: Request,
                                    res: Response, next: NextFunction) {

    const { amount, meal_id, time } = req.body;

    if (amount && !assertPositiveAmount(amount)) {
        return next(new HTTPError(400, "Invalid amount"));
    }

    if (meal_id && !assertMealExistsInDb(meal_id)) {
        return next(new HTTPError(400, `No meal found with ID ${meal_id}`));
    }

    if (time && !assertTimeNotInFuture(time)) {
        return next(new HTTPError(400, "Invalid time"));
    }

    next();
};