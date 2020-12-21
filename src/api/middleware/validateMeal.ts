import { Request, Response, NextFunction } from 'express';

import { IIngredient } from '../../interfaces'

const HTTPError = require('http-errors');
const Ingredient = require('../../models/Ingredient');

/*
Validate that the provided ingredient ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertIngredientExistsInDb(ingredients: Array<IIngredient>, user_id: string) {
    // Go through ingredients and check if they exist in database.
    for (const ingredient of ingredients) {
        const found = await Ingredient.findOne({ _id: ingredient['id'], user_id: user_id });

        if (!found) {
            return false;
        }
    }

    return true;
}


/*
Validate that that the amount of each ingredient is positive.
*/
function assertIngredientsAmountPositive(ingredients: Array<IIngredient>) {
    for (const ingredient of ingredients) {
        if (ingredient['amount'] <= 0) {
            return false;
        }
    }

    return true;
}

/*
Validate that there is at least one ingredient.
*/
function assertIngredients(ingredients: Array<IIngredient>) {
    return (ingredients.length > 0);
}

/*
Middleware to validate PUT/PATCH parameters for Meal.
*/
export async function validateParams(req: Request,
                                    res: Response, next: NextFunction) {

    const { ingredients, user_id } = req.body;

    if (ingredients && !assertIngredients(ingredients)) {
        next(new HTTPError(400, "A meal needs a positive number of ingredients"));
    }

    if (ingredients && !(await assertIngredientExistsInDb(ingredients, user_id))) {
        next(new HTTPError(404, `Invalid ingredient ID`));
    }

    if (ingredients && !assertIngredientsAmountPositive(ingredients)) {
        next(new HTTPError(400, "The amount of ingredient can only be positive"));
    }

    next();
};