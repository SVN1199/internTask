const express = require('express')
const { getProfile, postProfile, putProfile } = require('../controller/profileController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getProfile)
router.post('/', protect, postProfile)
router.put('/:id', protect , putProfile)

module.exports = router