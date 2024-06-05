require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const cloudinary = require("cloudinary").v2;

const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const app = express();


cloudinary.config({
    secure:true,
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// async function handleUpload(file){
//   const res = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return res;
// }


app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// app.use("/api", apiRoutes);


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error uploading image to Cloudinary" });
        }
        res.json(result);
        // secure_url -- image path
        // created_at
        // height: 
        // width:
        // asset_id = completely unique across all cloudinary files in my account
        // public_id = uploads/:id

      }
    ).end(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}.`);
});