const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const textController = require("../controllers/textController");
const tripsController = require("../controllers/tripsController");
const userController = require("../controllers/userController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/authenticateToken");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");

router.use(authenticateToken);

router.get("/profile", userController.getUserInfo);

router.route("/:entrydate/photos")
    .post(upload.single("image"), photosController.uploadPhoto)
    .get(photosController.getTodaysPhotos);

router.route("/:entrydate/text")
    .post(body("description").trim().notEmpty(), validateRequestSchema, textController.uploadText)
    .get(textController.getText);

router.route("/trips")
    .post(body("trip_name").trim().notEmpty(), body("start_date").trim().notEmpty().isDate({ format: "YYYY-MM-DD" }), body("end_date").optional().trim().isDate({ format: "YYYY-MM-DD" }), validateRequestSchema, tripsController.createTrip)
    .get(tripsController.getAllTrips);

router.get("/trips/:tripId", tripsController.getTripById);

router.route("/entries")
.post(entriesController.addNewEntry)
.get(entriesController.getEntry);

module.exports = router;