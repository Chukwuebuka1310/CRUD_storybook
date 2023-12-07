// Just stories routes and not followed by something (i.e /stories, /stories/add)
const express = require('express')
const router = express.Router()
const {ensureGuest, ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

//  @desc   ADD STORIES PAGE
//  @route  GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
   res.render('stories/add')
})

//  @desc   Show Single Story
//  @route  GET /stories/:id
router.get('/:id', ensureAuth, async(req, res) => {
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
})

//  @desc   Show autor stories
//  @route  GET /stories/user/:id
router.get('/user/:id', ensureAuth, async(req, res) => {
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
})


//  @desc   PROCESS ADD FORM
//  @route  GET /stories/
router.post('/', ensureAuth, async (req, res) => {
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
})

//  @desc   SHOW ALL STORIES
//  @route  GET /stories/
router.get('/', ensureAuth, async (req, res) => {
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
})

//  @desc   SHOW EDIT PAGE
//  @route  GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
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
      
})

//  @desc   Update stories
//  @route  PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
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

}) 


//  @desc   Delete STORIES PAGE
//  @route  DELETE /stories/delete/:id
router.delete('/delete/:id', ensureAuth, async (req, res) => {
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
})

module.exports = router