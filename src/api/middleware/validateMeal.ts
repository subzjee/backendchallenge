import { Request, Response, NextFunction } from 'express';

import { IIngredient } from '../../interfaces'

const Ingredient = require('../../models/Ingredient');

/*
Validate that the provided ingredient ID is a valid resource ID.

- Has to exist in the database.
*/
async function assertIngredientExistsInDb(ingredients: Array<IIngredient>, res: Response) {
    // Go through ingredients and check if they exist in database.
    for (const ingredient of ingredients) {
        const found = await Ingredient.findOne({ _id: ingredient['id'] });

        if (!found) {
            res.status(400).send("Ingredient ID is invalid");
            return false;
        }
    }

    return true;
}


/*
Validate that that the amount of each ingredient is positive.
*/
function assertIngredientsAmountPositive(ingredients: Array<IIngredient>, res: Response) {
    for (const ingredient of ingredients) {
        if (ingredient['amount'] <= 0) {
            res.status(400).send("Amount of an ingredient has to be positive");
            return false;
        }
    }

    return true;
}

/*
Validate that there is at least one ingredient.
*/
function assertIngredients(ingredients: Array<IIngredient>, res: Response) {
    if (ingredients.length <= 0) {
        res.status(400).send("There has to be at least one ingredient");
        return false;
    } else {
        return true;
    }
}

/*
Middleware to validate GET parameters for Meal.
*/
export async function validatePost(req: Request,
                                   res: Response, next: NextFunction) {
    if (assertIngredients(req.body.ingredients, res)
            && assertIngredientsAmountPositive(req.body.ingredients, res)
            && await assertIngredientExistsInDb(req.body.ingredients, res)) {
        next();
    } else {
        res.sendStatus(400);
    }

};

/*
Middleware to validate PATCH parameters for Meal.
*/
export async function validatePatch(req: Request,
                                    res: Response, next: NextFunction) {

    let validIngredients: boolean = true;
    let validIngredientId: boolean = true;
    let validIngredientsAmount: boolean = true;

    if (req.body.ingredients) {
        validIngredients = assertIngredients(req.body.ingredients, res);
        validIngredientId = await assertIngredientExistsInDb(req.body.ingredients, res);
        validIngredientsAmount = assertIngredientsAmountPositive(req.body.ingredients, res);
    }

    if (validIngredients && validIngredientId && validIngredientsAmount) {
        next();
    } else {
        res.sendStatus(400);
    }
};