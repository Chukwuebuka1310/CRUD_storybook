// Just plain routes and not followed by something (i.e /, /dashboard)
const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const indexController = require('../controllers/indexController')



//  @route  GET /
router.get('/', ensureGuest, indexController.loginPage)


//  @route  GET /dashboard
router.get('/dashboard', ensureAuth, indexController.dashboardPage)

module.exports = router