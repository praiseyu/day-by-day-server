require("dotenv").config();
// const knex = require("knex")(require("./knexfile"));

const express = require("express");
const cors = require("cors");
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const cloudinary = require("cloudinary").v2;


const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());


// cloudinary.config({
//   secure: true,
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });




app.use("/", publicRoutes);
app.use("/api", privateRoutes);

// app.post('/upload', upload.single('image'), async (req, res) => {

//   try {
//     const fileBuffer = req.file.buffer;
//     cloudinary.uploader.upload_stream(
//       { folder: "uploads" },
//       async (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ error: "Error uploading image to Cloudinary" });
//         }
//         try{
//           await knex("photos").insert({user_id: 1, photo_path: result.secure_url, width: result.width, height: result.height, file_type: result.resource_type });
//           res.json(result);
//         }
//         catch(err){
//           console.log(err);
//           return res.status(500);
//         }
//       }
//     ).end(fileBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error uploading image to Cloudinary" });
//   }
  
// });

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}.`);
});