const knex = require("knex")(require("../knexfile"));

// POST TEXT
async function uploadText(req, res){
    const {entryDate} = req.params;
    const {description} = req.body;
    const {user_id} = req.user; 
    try{
        const newTextId = await knex("textblocks").insert({description: description, entry_date: entryDate, user_id: user_id});
        const newTextBlock = await knex("textblocks").where("text_id", newTextId[0]);
        return res.status(201).json(newTextBlock);
    } catch(err){
        return res.status(500).send(`Error posting new text block: ${err}.`);
    }
}

// GET TEXT
async function getText(req, res){
    const {entryDate} = req.params;
    const {user_id} = req.user; 
    try{
        const textBlocks = await knex("textblocks").where("user_id", user_id).andWhere("entry_date", entryDate);
        res.status(200).json(textBlocks);
    } catch(err){
        res.status(404).send("No entries for this date found.");
    }
}

module.exports = {
    uploadText,
    getText
}