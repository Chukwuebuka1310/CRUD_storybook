const mongoose = require('mongoose')
const Story = require('../models/Story')


//  @desc   Login/Landing page
const loginPage = (req, res) => {
   res.render('login',{
      layout: 'login'
   })
}


//  @desc   Dashboard page
const dashboardPage = async (req, res) => {

   try {
      const stories = await Story.find({ user: req.user.id }).lean()
      res.render('dashboard',{
         name: req.user.firstName,
         stories
      })
   } catch (error) {
      console.log(error);
      res.render('error/500')
   }

}


module.exports = {
   loginPage,
   dashboardPage,
}