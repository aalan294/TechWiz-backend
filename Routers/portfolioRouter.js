const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/portfolioController').newPortfolio)
    .put(require('../CONTROLLERS/portfolioController').updatePortfolio)
router.route('/:id')
    .get(require('../CONTROLLERS/portfolioController').getPortfolio)

module.exports = router
