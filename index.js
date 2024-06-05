require("dotenv").config();

const express = require("express");
const cors = require("cors");
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const cloudinary = require("cloudinary").v2;


const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());


cloudinary.config({
    secure:true,
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});




// app.use("/api", apiRoutes);


// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const fileBuffer = req.file.buffer;
//     await cloudinary.uploader.upload_stream(
//       { folder: "uploads" },
//       (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ error: "Error uploading image to Cloudinary" });
//         }
//         res.json(result);
//       }
//     ).end(fileBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error uploading image to Cloudinary" });
//   }
// });

        // secure_url -- image path
        // created_at
        // height: 
        // width:
        // asset_id = completely unique across all cloudinary files in my account
        // public_id = uploads/:id

app.use("/", publicRoutes);
// app.use("/api", privateRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}.`);
});