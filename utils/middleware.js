const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await knex("users").select("user_id", "email", "name").where({ email });
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

module.exports = { authenticateToken };

