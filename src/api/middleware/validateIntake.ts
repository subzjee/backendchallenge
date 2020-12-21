import { Request, Response, NextFunction } from 'express';

const HTTPError = require('http-errors');
const Meal = require('../../models/Meal');

/*
Validate that the provided meal ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertMealExistsInDb(id: string, user_id: string) {
    try {
        const found = await Meal.findOne({_id: id, user_id: user_id});

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
    return (amount > 0);
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

    const { amount, meal_id, time, user_id } = req.body;

    if ((amount !== undefined) && !assertPositiveAmount(amount)) {
        next(new HTTPError(400, "Invalid amount"));
    }

    if (meal_id && !(await assertMealExistsInDb(meal_id, user_id))) {
        next(new HTTPError(404, "Invalid meal ID"));
    }

    if (time && !assertTimeNotInFuture(time)) {
        next(new HTTPError(400, "Invalid time"));
    }

    next();
};