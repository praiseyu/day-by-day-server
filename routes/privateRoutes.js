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
//ONCE AUTHENTICATION WORKS, UNCOMMENT THESE PATHS::

router.get(userController.getUserInfo);
// POST /photos (upload photos) -- WORKS]
router.route("/:entrydate/photos")
    .post(upload.single("image"), photosController.uploadPhoto)
    .get(photosController.getTodaysPhotos);
// router.post("/photos/:entrydate", authenticateToken, upload.single("image"), photosController.uploadPhoto);
// router.get("/photos/:entrydate", authenticateToken, photosController.getTodaysPhotos);

router.route("/:entrydate/text")
    .post(body("description").trim().notEmpty(), validateRequestSchema, textController.uploadText)
    .get(textController.getText);

// POST /text -- IT WORKS 
// router.post("/:entrydate/text", authenticateToken, textController.uploadText)

// GET /text -- IT WORKS
// router.get("/:entrydate/text", authenticateToken, textController.getText)

// POST /entries (updates db with layout, text, and photo paths)

//POST /trips 
// creates a new trip to add trip logs to: 
// router.post("/trips", authenticateToken, tripsController.createTrip);
// GET /trips
// displays list of trips
// router.get("/trips", authenticateToken, tripsController.getAllTrips);

router.post("/trips", body("trip_name").trim().notEmpty(), body("start_date").trim().notEmpty().isDate({ format: "YYYY-MM-DD" }), body("end_date").optional().trim().isDate({ format: "YYYY-MM-DD" }), validateRequestSchema, tripsController.createTrip);
router.get("/trips", tripsController.getAllTrips);
// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)
router.get("/trips/:tripId", authenticateToken, tripsController.getTripById);

module.exports = router;