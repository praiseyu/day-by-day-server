const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const textController = require("../controllers/textController");
const tripsController = require("../controllers/tripsController");
const {authenticateToken} = require("../utils/middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

//UNAUTHENTICATED ROUTES:
// POST /photos (upload photos) - AUTHDONE
// router.post("/photos/:entrydate", upload.single("image"), photosController.uploadPhoto);

// GET /photos -AUTH DONE
// router.get("/photos/:entrydate", photosController.getTodaysPhotos);

// POST /text - AUTH DONE
// router.post("/:entrydate/text", textController.uploadText)

// GET /text - AUTH DONE
// router.get("/:entrydate/text", textController.getText)

// POST /entries (updates db with layout, text, and photo paths)

//POST /trips 
// creates a new trip to add trip logs to: 

// GET /trips
// displays list of trips


// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)




//ONCE AUTHENTICATION WORKS, UNCOMMENT THESE PATHS::
// POST /photos (upload photos) -- WORKS
router.post("/photos/:entrydate", authenticateToken, upload.single("image"), photosController.uploadPhoto);

// GET /photos -- IT WORKS 
router.get("/photos/:entrydate", authenticateToken, photosController.getTodaysPhotos);

// POST /text -- IT WORKS 
router.post("/:entrydate/text", authenticateToken, textController.uploadText)

// GET /text -- IT WORKS
router.get("/:entrydate/text", authenticateToken, textController.getText)

// POST /entries (updates db with layout, text, and photo paths)


//POST /trips 
// creates a new trip to add trip logs to: 
router.post("/trips", authenticateToken, tripsController.createTrip);
// GET /trips
// displays list of trips
router.get("/trips", authenticateToken, tripsController.getAllTrips);

// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)
router.get("/trips/:tripId", authenticateToken, tripsController.getTripById);

module.exports = router;