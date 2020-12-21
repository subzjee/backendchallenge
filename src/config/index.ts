const dotenv = require('dotenv');

dotenv.config();

export default {
    port: process.env.SV_PORT,
    dbUrl: process.env.DB_URL ?? "",
    jwtToken: process.env.JWT_SECRET
}