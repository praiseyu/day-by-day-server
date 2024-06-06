const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function addNewUser(req, res) {
    const { name, email, password } = req.body;
    const encrypted = bcrypt.hashSync(password);

    try {
        await knex("users").insert({ name, email, password: encrypted });
        res.status(201).json({ success: true });
    } catch (err) {
        console.error(err.code);
        if (err.code === "ER_DUP_ENTRY") {
            res.status(400).send("Email already exists.");
        }
        else {
            res.status(500).send("Something went wrong. Try again.");
        }
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await knex("users").where({ email }).first();

        if (!user) {
            return res.status(400).send("Email is incorrect.");
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send("Email or password is incorrect.");
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.json({ token });

    } catch (err) {
        res.status(401).send("Login failed.");
    }
}

module.exports = {
    addNewUser,
    loginUser
}