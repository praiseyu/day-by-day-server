const knex = require("knex")(require("../knexfile"));

async function addNewEntry(req, res){
    const {user_id} = req.user; 
    const {entryDate} = req.params;
    const {tripId} = req.params;
    const {status, layout} = req.body;

    try{
        const newEntry = await knex("entries").insert({user_id: user_id, trip_id: tripId, status: status, entry_date: entryDate, layout: layout});
        return res.status(201);
    }catch(err){
        return res.status(500).send(`Error saving entry: ${err}.`);
    }
 }

async function getEntry(req, res){
    const {user_id} = req.user; 
    const {entryDate} = req.params;
    const {tripId} = req.params;

    try{
        const entryDetails = await knex("entries").where("user_id", user_id).andWhere("entry_date", entryDate);
        return res.status(200).json(entryDetails);
    }catch(err){
        return res.status(404).send(`Error fetching entries: ${err}.`);
    }
}


module.exports = {
    addNewEntry,
    getEntry
}