const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const textController = require("../controllers/textController");
const tripsController = require("../controllers/tripsController");
const userController = require("../controllers/userController");
const entriesController = require("../controllers/entriesController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/authenticateToken");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");

router.use(authenticateToken);

router.get("/profile", userController.getUserInfo);

router.route("/:entryDate/photos")
    .post(upload.single("image"), photosController.uploadPhoto)
    .get(photosController.getTodaysPhotos)
    .delete(photosController.deletePhoto);

router.route("/:entryDate/text")
    .post(body("description").trim().notEmpty(), validateRequestSchema, textController.uploadText)
    .get(textController.getText);

// router.get("/:entryDate/uploads", entriesController.getUploads);

router.route("/trips")
    .post(body("trip_name").trim().notEmpty(), body("start_date").trim().notEmpty().isDate({ format: "YYYY-MM-DD" }), body("end_date").optional().trim().isDate({ format: "YYYY-MM-DD" }), validateRequestSchema, tripsController.createTrip)
    .get(tripsController.getAllTrips);

router.get("/trips/:tripId", tripsController.getTripById);


router.get("/entries/:tripId", entriesController.getEntriesByTripId);

router.route("/entries/:tripId/:entryDate")
.post(entriesController.addNewEntry)
.put(entriesController.saveEditEntry)
.get(entriesController.getEntry);



module.exports = router;