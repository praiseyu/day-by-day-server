const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const textController = require("../controllers/textController");
const {authenticateToken} = require("../utils/middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

//UNAUTHENTICATED ROUTES:
// POST /photos (upload photos) - AUTHDONE
// router.post("/photos/:entrydate", upload.single("image"), photosController.uploadPhoto);

// GET /photos -AUTH DONE
// router.get("/photos/:entrydate", photosController.getTodaysPhotos);

// POST /text 
router.post("/:entrydate/text", textController.uploadText)

// GET /text
router.get("/:entrydate/text", textController.getText)

// POST /entries (updates db with layout, text, and photo paths)


// GET /trips
// displays list of trips


// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)




//ONCE AUTHENTICATION WORKS, UNCOMMENT THESE PATHS::
// POST /photos (upload photos) -- WORKS
router.post("/photos/:entrydate", authenticateToken, upload.single("image"), photosController.uploadPhoto);

// GET /photos -- IT WORKS 
router.get("/photos/:entrydate", authenticateToken, photosController.getTodaysPhotos);

// POST /text 


// GET /text


// POST /entries (updates db with layout, text, and photo paths)


// GET /trips
// displays list of trips


// GET /trips/:tripId
// - gets trip name, trip dates (shows if there is log for that day or not)

module.exports = router;