const {ctrlWrapper} = require("../../helpers/index");


const getCurrent = async(req, res) => {
    const {username, email, subscription, avatarURL} = req.user;

    res.send({username, email, subscription, avatarURL});
};


module.exports = {
    getCurrent: ctrlWrapper(getCurrent)
};