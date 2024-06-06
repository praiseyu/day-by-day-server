const knex = require("knex")(require("../knexfile"));

// POST TEXT

async function uploadText(req, res){
    const {entrydate} = req.params;
    const {description} = req.body;
    if(!description || description.trim()===""){
        return res.status(400).send("Text is missing.")
    }
    try{
        const newTextId = await knex("textblocks").insert({description: description, entry_date: entrydate});
        const newTextBlock = await knex("textblocks").where("text_id", newTextId[0]).first();
        return res.status(201).json(newTextBlock);
    } catch(err){
        return res.status(500).send(`Error posting new text block: ${err}`);
    }
}

// GET TEXT
async function getText(req, res){
    const {entrydate} = req.params;
    try{
        const textBlocks = await knex("textblocks").where("entry_date", entrydate);
        res.status(200).json(textBlocks);
    } catch(err){
        res.status(404).send("No entries for this date found.");
    }
}

module.exports = {
    uploadText,
    getText
}