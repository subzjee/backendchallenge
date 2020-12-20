# Assumptions
- All structures are private to the creating user. This is why I add the `user_id` to each MongoDB document.
- Data structure fields dependent on other data structures are hard-linked through resource IDs. Each intake has a `meal_id` and each meal ingredient points to an `ingredient_id`. The resource IDs are validated. The way I saw this is that that user can click through a UI on the ingredients/meals that the user has added before instead of textual input.
- As this is just a proof-of-concept, I have decided to not expire JSON Web Tokens. This also makes it easier to test. In a production environment, you would have to let the tokens expire and refresh if needed.