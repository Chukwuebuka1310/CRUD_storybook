const passport = require('passport')

// @desc  Auth with Google
const googleAuth = passport.authenticate('google', { scope: ['profile'] })


// @desc  Google Auth Callback
const authCallback = passport.authenticate('google', {
   successRedirect: '/dashboard',
   failureRedirect: '/'
})

// @desc  LOGOUT User
const logoutUser = (req, res, next) => {
   req.logout(err => {
      if(err){return next(err)}
      res.redirect('/')
   })
}

module.exports = {
   googleAuth,
   authCallback,
   logoutUser
}