const knex = require("knex")(require("../knexfile"));

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

module.exports = {
    createTrip,
    getAllTrips,
    getTripById
}