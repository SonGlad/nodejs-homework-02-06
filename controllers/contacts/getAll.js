const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers/index");


const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {favorite} = req.query;

    const filter = { owner };

    if (favorite !== undefined) {
        if (favorite === "true") {
            filter.favorite = true;
        } else if (favorite === "false") {
            filter.favorite = false;
        }
    }

    const {page = 1, limit = 20} = req.query;
    const skip = (page -1) * limit;
    const result = await Contact.find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate("owner", "username email");
    // const result = await Contact.find({owner}, {skip, limit}).populate("owner", "username email");
    
    res.status(200).send(result);
};


module.exports = { 
    getAll: ctrlWrapper(getAll)
};
