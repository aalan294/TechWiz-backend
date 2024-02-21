const express = require('express')
const router = express.Router()

router.route('/')
    .get(require('../CONTROLLERS/memberController').getAllMembers)
router.route('/:id')
    .delete(require('../CONTROLLERS/memberController').delMember)
router.route('/admin')
    .get(require('../CONTROLLERS/memberController').getUsers)

module.exports = router