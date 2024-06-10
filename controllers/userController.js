async function getUserInfo(req, res) {
    return res.json(req.user);
}

module.exports = {
    getUserInfo
}