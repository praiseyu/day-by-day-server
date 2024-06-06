const knex = require("knex")(require("../knexfile"));

// POST TEXT

async function uploadText(req, res){
    if(!req.body || req.body.trim()===""){
        return res.status(400).send("Text is missing.")
    }
    try{
        const newTextId = await knex("textblocks").insert(req.body);
        const newTextBlock = await knex("textblocks").where("text_id", newTextId[0]).first();
        return res.status(201).json(newTextBlock);
    } catch(err){
        return res.status(500).send(`Error posting new text block: ${err}`);
    }
}

// GET TEXT
async function getText(req, res){
        try{
            
    } catch(err){
        
    }
}

module.exports = {
    uploadText,
    getText
}