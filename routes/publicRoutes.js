const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { body } = require("express-validator");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");


router.post("/signup",
    body("email").isEmail(),
    body("name").exists({ checkFalsy: true }),
    body("password").isLength({ min: 8 }),
    validateRequestSchema,
    authController.addNewUser
);

router.post("/login",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    validateRequestSchema,
    authController.loginUser
);


// const {authenticateToken} = require("../utils/middleware");

// POST /signup
// router.post("/signup",
// body("email").isEmail(),
// body("name").exists({ checkFalsy: true }),
// body("password").isLength({ min: 8 }),
// validateRequestSchema,
// async (req, res) => {
// const { name, email, password } = req.body;
// const encrypted = bcrypt.hashSync(password);

// try {
//     await knex("users").insert({ name, email, password: encrypted });
//     res.status(201).json({ success: true });
// } catch (err) {
//     console.error(err.code);
//     if (err.code === "ER_DUP_ENTRY") {
//         res.status(400).send("Email already exists.");
//     }
//     else {
//         res.status(500).send("Something went wrong. Try again.");
//     }
// }
// });

// POST /login

// router.post("/login",
//     body("email").isEmail(),
//     body("password").isLength({ min: 8 }),
//     async (req, res) => {
// const { email, password } = req.body;

// try {
//     const user = await knex("users").where({ email }).first();

//     if (!user) {
//         return res.status(400).send("Email is incorrect.");
//     }

//     if (!bcrypt.compareSync(password, user.password)) {
//         return res.status(400).send("Email or password is incorrect.");
//     }

//     // const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
//     res.json({ token });

// } catch (err) {
//     res.status(401).send("Login failed.");
// }
// });


module.exports = router;