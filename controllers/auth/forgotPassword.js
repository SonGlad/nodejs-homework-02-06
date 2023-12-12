const {ctrlWrapper, HttpError, sendEmail} = require("../../helpers/index");
const { User } = require("../../models/user");
const crypto = require("node:crypto");
require("dotenv").config();


const {BASE_URL} = process.env;


const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }
  
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;
  
    await User.findByIdAndUpdate(user._id, {resetToken, resetTokenExpiry});
  
    // TODO Замінити link
    const resetPasswordLink = `${BASE_URL}/set-new-password/${resetToken}`;
  
    const resetPasswordEmail = {
      to: email,
      subject: "Reset Password",
      html: `<p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
              <p>Please click on the following link to reset your password:</p>
              <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };
  
    await sendEmail(resetPasswordEmail);
  
    res.send({ message: "Reset password email sent", resetToken });
};


module.exports = {
    forgotPassword: ctrlWrapper(forgotPassword)
};