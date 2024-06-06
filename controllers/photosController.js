const cloudinary = require("cloudinary").v2;
const knex = require("knex")(require("../knexfile"));

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

async function uploadPhoto(req, res) {
  const { entrydate } = req.params;
  const { user_id } = req.user;
  try {
    const fileBuffer = req.file.buffer;
    cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error uploading image to Cloudinary" });
        }
        try {
          await knex("photos").insert({ user_id: user_id, entry_date: entrydate, photo_path: result.secure_url, width: result.width, height: result.height, file_type: result.resource_type });
          return res.json(result);
        }
        catch (err) {
          console.log(err);
          return res.status(500).send("Error adding image details to database.");
        }
      }
    ).end(fileBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
}

async function getTodaysPhotos(req, res) {
  const { entrydate } = req.params;
  const { user_id } = req.user;
  try {
    const photos = await knex("photos").where("user_id", user_id).where("entry_date", entrydate);
    if (!photos) {
      return res.status(404).send("There are no photos. Upload some to begin.");
    }
    return res.status(200).json(photos);
  }
  catch (err) {
    return res.status(400).send(`Error retrieving today's photos: ${err}`);
  }
}

module.exports = {
  uploadPhoto,
  getTodaysPhotos
}