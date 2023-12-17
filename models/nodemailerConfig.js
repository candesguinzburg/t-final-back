const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSEMAIL,
  },
})

module.exports = transporter
