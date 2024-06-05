const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const {authenticateToken} = require("../utils/middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

//UNAUTHENTICATED ROUTES:
// POST /photos (upload photos)
// router.post("/photos/:entrydate", upload.single("image"), uploadController.uploadPhoto);

// GET /photos 
// router.get("/photos/:entrydate", uploadController.getTodaysPhotos);

// POST /text 


// GET /text


// POST /entries (updates db with layout, text, and photo paths)


// GET /trips
// displays list of trips


// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)




//ONCE AUTHENTICATION WORKS, UNCOMMENT THESE PATHS::
// POST /photos (upload photos)
router.post("/photos/:entrydate", authenticateToken, upload.single("image"), uploadController.uploadPhoto);

// GET /photos 
router.get("/photos/:entrydate", authenticateToken, uploadController.getTodaysPhotos);

// POST /text 


// GET /text


// POST /entries (updates db with layout, text, and photo paths)


// GET /trips
// displays list of trips


// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)

module.exports = router;