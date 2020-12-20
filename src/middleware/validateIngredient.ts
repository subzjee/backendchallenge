import { Request, Response, NextFunction } from 'express';

const User = require('../models/User');

/*
Validate the amount of calories.

- Has to be positive
*/
function assertCaloriesPositive(calories: Number, res: Response) {
    if (calories <= 0) {
        res.status(400).send("Calories must be positive");
        return false;
    }

    return true;
}

/*
Validate the structure of the nutritional values.

- Has to have length 3
- Consist out of only carbs, fats and protein.
*/
function assertNutritionalValuesValid(vals: Object, res: Response) {
    const nutritional_types = ['carbs', 'fats', 'protein'];

    if (Object.keys(vals).length !== 3) {
        res.status(400).send("Nutritional values can only contain carbs, protein and fats");
        return false;
    } else {
        for (const type of nutritional_types) {
            if (!(type in vals)) {
                res.status(400).send(`Has to contain ${type}`);
                return false;
            }
        }
    }

    return true;
}

/*
Middleware to validate GET parameters for Ingredient.
*/
export async function validatePost(req: Request,
                                   res: Response, next: NextFunction) {

    if (assertCaloriesPositive(req.body.calories, res)
        && assertNutritionalValuesValid(req.body.nutritional_vals, res)) {
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

    let validCalories: boolean = true;
    let validNutritionalValues: boolean = true;

    if (req.body.calories) {
        validCalories = assertCaloriesPositive(req.body.calories, res);
    }

    if (req.body.nutritional_vals) {
        validNutritionalValues = assertNutritionalValuesValid(req.body.nutritional_vals, res);
    }

    if (validCalories && validNutritionalValues) {
        next();
    } else {
        res.sendStatus(400);
    }
};