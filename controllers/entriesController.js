const knex = require("knex")(require("../knexfile"));

async function addNewEntry(req, res) {
    const { user_id } = req.user;
    const { entryDate, tripId } = req.params;
    const { status, layout, border_color, border_width, text_color } = req.body;
    const statusValue = status ? 1 : 0;
    console.log(status, entryDate, tripId);

    try {
        const newEntry = await knex("entries").insert({ user_id: user_id, trip_id: tripId, status: statusValue, entry_date: entryDate, layout: layout, border_color: border_color, border_width: border_width, text_color: text_color });
        return res.status(201).json(newEntry);
    } catch (err) {
        return res.status(500).send(`Error saving entry: ${err}.`);
    }
}

async function getEntry(req, res) {
    const { user_id } = req.user;
    const { entryDate, tripId } = req.params;

    try {
        const entryDetails = await knex("entries").where("user_id", user_id).andWhere("entry_date", entryDate);
        return res.status(200).json(entryDetails);
    } catch (err) {
        return res.status(404).send(`No layout for this entry yet: ${err}.`);
    }
}

async function getUploads() {
    const { user_id } = req.user;
    const { entryDate, tripId } = req.params;

    try {

        const photoData = await knex("photos").where("user_id", user_id).andWhere("entry_date", entryDate).select("photo_id, photo_path");
        const textData = await knex("textblocks").where("user_id", user_id).andWhere("entry_date", entryDate).select("description", "text_id");
        res.status(200).json({ photoData, textData });
    } catch (err) {
        console.error("Error getting data.");
        res.status(500).send("Error fetching photo and text data.");
    }
}


module.exports = {
    addNewEntry,
    getEntry,
    getUploads
}