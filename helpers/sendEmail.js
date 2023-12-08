const nodemailer = require("nodemailer");
require("dotenv").config();


// const {UKR_NET_PASSWORD, UKR_NET_EMAIL} = process.env;

// const nodemailerConfig = {
//     host: "smtp.ukr.net",
//     port: 465, // 25, 465, 2525
//     secure: true,
//     auth: {
//       user: UKR_NET_EMAIL,
//       pass: UKR_NET_PASSWORD,
//     },
// };


const {MAILTRAP_PASSWORD, MAILTRAP_USER} = process.env;

const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  }
};


const transport = nodemailer.createTransport(nodemailerConfig);


const sendEmail = (data) => {
  const email = {...data, from: MAILTRAP_USER};
  return transport.sendMail(email);
};


module.exports = sendEmail;


