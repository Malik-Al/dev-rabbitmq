const Router = require('express')
const router = new Router()
const {mailController} = require('../controler/controllers')

router.post('/message', mailController)

module.exports = router