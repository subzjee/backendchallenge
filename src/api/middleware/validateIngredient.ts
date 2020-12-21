import { Request, Response, NextFunction } from 'express';

const HTTPError = require('http-errors');

/*
Validate the amount of calories.

- Has to be positive
*/
function assertCaloriesPositive(calories: Number) {
    if (calories <= 0) {
        return false;
    }

    return true;
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

    if (calories && !assertCaloriesPositive(calories)) {
        return next(new HTTPError(400, "Calories must be positive"));
    }

    if (nutritional_vals && !assertNutritionalValuesValid(nutritional_vals)) {
        return next(new HTTPError(400, `Invalid format for nutritional values`));
    }

    next();
};