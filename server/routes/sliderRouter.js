// External dependencies
const express = require('express')

// Internal dependencies
const { auth } = require('../app/http/middlewares/authOrGuest/authOrGuest')
const { store, index, updateStatus, destroy, find, update } = require('./../app/http/controllers/slider/SliderController')
const sliderImageUpload = require('./../app/http/helpers/file_uploads/sliderImageUpload')
const { sliderValidator, sliderValidatorChecker } = require('../app/http/helpers/validators/sliderValidator')

// create router
const router = express.Router()

// FIND
router.get('/:id', auth, find) // It should be placed on above, otherwise will be conflict with next get method

// INDEX
router.get('/:page?/:limit?/:search?', auth, index)

// STORE
router.post('/store', auth, sliderImageUpload, sliderValidator, sliderValidatorChecker, store)

// UPDATE STATUS
router.patch('/update/status', auth, updateStatus)

// UPDATE | update using POST if we've image/file
router.post('/update', auth, sliderImageUpload, sliderValidator, sliderValidatorChecker, update)

// DESTROY
router.delete('/destroy/:id', auth, destroy)

module.exports = router