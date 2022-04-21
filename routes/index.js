const Router = require('express')
const router = new Router()
const mailRouter = require('./mail.router')
const sendMessageQueueRouter  = require('./send.message.queue.router')

router.use('/mail', mailRouter)
router.use('/queue', sendMessageQueueRouter)

module.exports = router