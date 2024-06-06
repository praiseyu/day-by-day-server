const knex = require("knex")(require("../knexfile"));

async function getUserInfo(req,res){
    const {user_id, name} = req.user; 
    return res.status(200).json({user_id, name});
}

module.exports = {
    getUserInfo
}