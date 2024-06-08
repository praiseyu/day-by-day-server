const knex = require("knex")(require("../knexfile"));

async function getUserInfo(req,res){
    console.log(req.user);
    // const {user_id, name} = req.user; 
    return res.json(req.user);
    // return res.status(200).json({user_id, name});
}

module.exports = {
    getUserInfo
}