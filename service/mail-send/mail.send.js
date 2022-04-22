const nodemailer = require('nodemailer')
const {PORT, HOST, TITLE_URL, USER} = require('../../config')

const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: false,
    tls: { rejectUnauthorized: false}
})


exports.mailSend = async function (toMail, message) {
      return await transporter.sendMail({
            from: USER,
            to: toMail,
            subject: TITLE_URL,
            html: message
        })
}




















