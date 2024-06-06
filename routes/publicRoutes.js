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

module.exports = router;