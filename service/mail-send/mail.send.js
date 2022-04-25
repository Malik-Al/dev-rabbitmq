const nodemailer = require('nodemailer')
const {SMTP_USER, SMTP_HOST, SMTP_TITLE_URL, SMTP_PORT} = require('../../config')

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    tls: { rejectUnauthorized: false}
})


exports.mailSend = async function (toMail, message) {
    try {
        return await transporter.sendMail({
            from: SMTP_USER,
            to: toMail,
            subject: SMTP_TITLE_URL,
            html: message
        })
    }catch (e) {
        return new Error(e)
    }
}

