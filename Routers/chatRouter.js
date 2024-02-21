const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/chatController').newMessage)
router.route('/inbox')
    .post(require('../CONTROLLERS/chatController').getAllMessages)

module.exports = router