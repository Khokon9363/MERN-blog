// External dependencies
const express = require('express')

// Internal dependencies
const { register, login, me, update, passwordUpdate } = require('../app/http/controllers/auth/authController')
const avatarUpload = require('../app/http/helpers/file_uploads/avatarUpload')
const avatarUpdate = require('../app/http/helpers/file_uploads/avatarUpdate')
const { registerValidator, registerValidatorChecker } = require('../app/http/helpers/validators/registerValidator')
const { loginValidator, loginValidatorChecker } = require('../app/http/helpers/validators/loginValidator')
const { updateValidator, updateValidatorChecker } = require('../app/http/helpers/validators/updateValidator')
const { passwordValidator, passwordValidatorChecker } = require('../app/http/helpers/validators/passwordValidator')
const { auth, guest } = require('../app/http/middlewares/authOrGuest/authOrGuest')

// create router
const router = express.Router()

router.post('/register', guest, avatarUpload, registerValidator, registerValidatorChecker, register)
router.post('/login', guest, loginValidator, loginValidatorChecker, login)
router.post('/profile/me', auth, me)
router.post('/profile/update', auth, avatarUpdate, updateValidator, updateValidatorChecker, update)
router.post('/password/update', auth, passwordValidator, passwordValidatorChecker, passwordUpdate)

module.exports = router