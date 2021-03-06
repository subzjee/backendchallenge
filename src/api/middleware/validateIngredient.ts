import { Request, Response, NextFunction } from 'express';

const HTTPError = require('http-errors');

/*
Validate the amount of calories.

- Has to be positive
*/
function assertCaloriesPositive(calories: Number) {
    return (calories >= 0);
}

/*
Validate the structure of the nutritional values.

- Has to have length 3
- Consist out of only carbs, fats and protein.
*/
function assertNutritionalValuesValid(vals: {[key: string]: Number}) {
    const nutritional_types = ['carbs', 'fats', 'protein'];

    if (Object.keys(vals).length !== 3) {
        return false;
    }

    for (const type of nutritional_types) {
        if (!(type in vals) || (vals[type] < 0)) {
            return false;
        }
    }

    return true;
}

/*
Middleware to validate PUT/PATCH parameters for Ingredient.
*/
export async function validateParams(req: Request,
                                    res: Response, next: NextFunction) {

    const { calories, nutritional_vals } = req.body;

    if ((calories !== undefined) && !assertCaloriesPositive(calories)) {
        next(new HTTPError(400, "Calories can not be negative"));
    }

    if (nutritional_vals && !assertNutritionalValuesValid(nutritional_vals)) {
        next(new HTTPError(400, `Invalid format for nutritional values`));
    }

    next();
};