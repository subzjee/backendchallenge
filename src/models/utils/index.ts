const User = require('../User');

export async function userExists(val: string) {
    return await User.findOne({_id: val});
}