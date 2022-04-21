const {mailSend} = require('../service/mail-send/mail.send')
const {send} = require('../service/send')

exports.mailController = async function (req, res){
    try {
        const {mailAccount, message} = req.body
        const result = await mailSend(mailAccount, message)
        console.log('mailSend', result)
        res.json(result)
    }catch (e) {
        console.log(e)
    }

}

exports.sendMessageQueue = function (req, res){
    try {
        const msg = req.body
        const result = send(msg)
        console.log('send(msg)', result)
        res.json(result)
    }catch (e) {
        console.log(e)
    }

}