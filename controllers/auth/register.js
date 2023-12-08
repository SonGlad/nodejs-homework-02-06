const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const {HttpError, ctrlWrapper, sendEmail} = require("../../helpers/index");
const crypto = require("node:crypto");
require("dotenv").config();


const {BASE_URL} = process.env;


const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, {
        s: '250',
        r: 'g',
        d: 'identicon'
    });
    const verificationToken = crypto.randomUUID();
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`
    }
    await sendEmail(verifyEmail);


    res.status(201).send({
        username: newUser.username,
        email: newUser.email,
    })
};


module.exports = {
    register: ctrlWrapper(register)
};