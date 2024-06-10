const cloudinary = require("cloudinary").v2;
const knex = require("knex")(require("../knexfile"));

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function createTrip(req, res) {
    const { user_id } = req.user;
    const tripData = { ...req.body, user_id };
    try {
        const newTripId = await knex("trips").insert(tripData);
        const newTrip = await knex("trips").where("trip_id", newTripId[0]);
        return res.status(201).json(newTrip);
    } catch (err) {
        return res.status(400).send(`Error creating a new trip: ${err}.`);
    }
}

async function getAllTrips(req, res) {
    const { user_id } = req.user;
    try {
        const tripData = await knex("trips").where("user_id", user_id);
        if (!tripData) {
            return res.status(404).send(`There are no trips! Add a new trip to continue.`);
        }
        return res.status(200).json(tripData);
    } catch (err) {
        return res.status(404).send(`Error fetching trip data: ${err}.`);
    }
}

async function getTripById(req, res) {
    const { user_id } = req.user;
    const { tripId } = req.params;
    try {
        const tripData = await knex("trips").where("user_id", user_id).andWhere("trip_id", tripId).first();
        if (!tripData) {
            return res.status(404).send(`Trip with ID ${tripId} not found.`);
        }
        return res.status(200).json(tripData);
    } catch (err) {
        return res.status(404).send(`Error finding a trip with that tripID: ${err}.`);
    }
}

async function deleteTrip(req, res) {
    const { user_id } = req.user;
    const { tripId } = req.params;
    try {
        await knex.transaction(async (trx) => {
            const textblocksToDelete = await trx('textblocks')
                .whereIn('entry_date', trx.select('entry_date').from('entries').where('trip_id', tripId))
                .select('text_id');
            if (textblocksToDelete.length > 0) {
                await trx('textblocks')
                    .whereIn('text_id', textblocksToDelete.map(tb => tb.text_id))
                    .del();
            }
            const photosToDelete = await trx("photos")
                .where({ user_id: user_id, trip_id: tripId })
                .select("public_id");
            if (photosToDelete.length > 0) {
                for (let photo of photosToDelete) {
                    await cloudinary.uploader.destroy(photo.public_id);
                    await trx('photos')
                        .where({ user_id, public_id: photo.public_id })
                        .del();
                }
            }
            await trx("entries")
                .where('trip_id', tripId)
                .del();
            await trx('trips')
                .where('trip_id', tripId)
                .del();
        });
        res.status(200).send(`Successfully deleted trip: ${tripId}.`);
    } catch (err) {
        return res.status(500).send(`Error deleting trip: ${err}.`)
    }
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    deleteTrip
}