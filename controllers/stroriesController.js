const Story = require('../models/Story')
const mongoose = require('mongoose')

//  @desc   ADD STORIES PAGE
const addStory = (req, res) => {
   res.render('stories/add')
}

//  @desc   Show Single Story
const singlePage = async(req, res) => {
   try {
      const id = req.params.id
      let story = await Story.findById(id).populate('user').lean()
      if(!story){
         return res.render('error/404')
      }
      res.render('stories/single',{
         story
      })
   } catch (error) {
      console.log(error);
      // res.render('error/404')
   }
}

//  @desc   Show autor stories
const authorStories = async(req, res) => {
   try {
      const id = req.params.id
      const story = await Story.find({user: id}).populate('user')
      if(!story){
         return res.render('error/404')
      }
      res.render('stories/authors',{
         story
      })
   } catch (error) {
      console.log(error);
      res.render('error/404')
   }
}

//  @desc   PROCESS ADD FORM
const postStory = async (req, res) => {
   try {
      req.body.user = req.user.id
      console.log(req.body)
      console.log(req.body.user);
      console.log(req.user)
      await Story.create(req.body)
      res.redirect('/dashboard')

   } catch (error) {
      console.log(error);
      res.render('error/500')
   }
}

//  @desc   SHOW ALL STORIES
const ShowAllStories = async (req, res) => {
   try {
      const stories = await Story.find({status: 'public'})
         .populate('user')
         .sort({createdAt: 'desc'})
         .lean()
      res.render('stories/index', {stories})
   } catch (error) {
      console.log(error)
      res.render('error/500')
   }
}

//  @desc   SHOW EDIT PAGE
const editPage = async (req, res) => {
   try {
      const story = await Story.findOne({_id: req.params.id}).lean()
      if(!story){
         res.render('error/500')
      }
      if(story.user != req.user.id){
         res.redirect('/stories')
      }else{
         res.render('stories/edit', {story})
      }
   } catch (error) {
      console.log(error)
      res.render('error/500')
   }
      
}

//  @desc   Update stories
const updateStory = async (req, res) => {
   try {
      let story = await Story.findById(req.params.id).lean()
   if(!story){
      return res.render('error/404')
   }

   if(story.user != req.user.id){
      res.redirect('/stories')
   }else{
      const id = req.params.id
      story = await Story.findByIdAndUpdate(id, req.body, {
         new: true,
         runValidators:true
      })
      res.redirect('/dashboard')
   }
   } catch (error) {
      console.log(error)
      res.render('error/500')
   }
}

const deleteStory = async (req, res) => {
   try {
      let story = await Story.findById(req.params.id).lean()
   if(!story){
      return res.render('error/404')
   }

   if(story.user != req.user.id){
      res.redirect('/stories')
   }else{
      const id = req.params.id
      story = await Story.findByIdAndDelete(id, req.body, {
         new: true,
         runValidators:true
      })
      res.redirect('/dashboard')
   }
   } catch (error) {
      console.log(error)
      res.render('error/500')
   }
}

module.exports = {
   addStory,
   singlePage,
   authorStories,
   postStory,
   ShowAllStories,
   editPage,
   updateStory,
   deleteStory

}