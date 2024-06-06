const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));

async function authenticateToken(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await knex("users").select("user_id", "email", "name").where({ email }).first();
        req.user = user;

        if(!user){
            res.status(401).json({error: "Unauthorized"});
        }
        next();
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

module.exports = { authenticateToken };

