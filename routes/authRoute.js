//Route for AUTHENTICATION

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


//@route  GET /auth/google
router.get('/google', authController.googleAuth)


// @route  GET /auth/google/callback
router.get('/google/callback', authController.authCallback)


//@route  GET /auth/logout
router.get('/logout', authController.logoutUser)

module.exports = router