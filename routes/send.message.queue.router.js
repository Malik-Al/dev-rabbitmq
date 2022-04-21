const Router = require('express')
const router = new Router()
const {sendMessageQueue} = require('../controler/controllers')

router.post('/send', sendMessageQueue)

module.exports = router