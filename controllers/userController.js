const knex = require("knex")(require("../knexfile"));

async function getUserInfo(req,res){
    return res.json(req.user);
}

module.exports = {
    getUserInfo
}