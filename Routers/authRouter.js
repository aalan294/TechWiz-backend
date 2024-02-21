const express = require('express')
const router = express.Router()

router.route('/register')
    .post(require('../CONTROLLERS/authController').register)

router.route('/login')
    .post(require('../CONTROLLERS/authController').login)

module.exports = router