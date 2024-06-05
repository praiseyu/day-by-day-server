const knex = require("knex")(require("../knexfile"));
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const {authorize} = require("../utils/middleware");

// POST /signup
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const encrypted = bcrypt.hashSync(password);

    try {
        await knex("users").insert({ name, email, password: encrypted });
        res.status(201).json({ success: true });
    } catch (err) {
        console.err(err.code);
        if (err.code === "ER_DUP_ENTRY") {
            res.status(400).send("Email already exists.");
        }
        else {
            res.status(500).send("Something went wrong. Try again.");
        }
    }
});

// POST /login

router.post("/login", async (req, res) => {
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
});

// router.get("/profile", authorize, (req, res) => {
//     res.json(req.user);
// });


module.exports = router;